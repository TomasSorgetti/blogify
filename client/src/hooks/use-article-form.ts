import { useCallback, useId, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import type { IArticle, VoiceTone } from "../types/article";
import { DEFAULT_ARTICLE_FORM_DATA } from "../constants/article";

export function generateSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function useArticleForm(initialData?: Partial<IArticle>) {
  const reactId = useId();
  const ids = useMemo(() => {
    const base = reactId.replace(/:/g, "");
    return {
      form: `article-form-${base}`,
      aiHeroTitle: `ai-hero-title-${base}`,
      aiPrompt: `ai-prompt-${base}`,
      aiToneLabel: `ai-tone-label-${base}`,
      tags: `tags-${base}`,
      statusLabel: `status-label-${base}`,
      categoryLabel: `category-label-${base}`,
    };
  }, [reactId]);

  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [formData, setFormData] = useState<IArticle>({
    ...DEFAULT_ARTICLE_FORM_DATA,
    ...initialData,
  });
  const [tagInput, setTagInput] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(
    typeof initialData?.coverImage === "string" 
      ? initialData.coverImage 
      : (initialData?.imageUrl || null),
  );

  const [aiPrompt, setAiPrompt] = useState("");
  const [aiTone, setAiTone] = useState<VoiceTone>("professional");

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const setField = useCallback(
    <K extends keyof IArticle>(key: K, value: IArticle[K]) => {
      setFormData((prev: IArticle) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleTitleChange = useCallback(
    (title: string) => {
      setFormData((prev: IArticle) => {
        const newFormData = { ...prev, title };
        if (!isSlugManuallyEdited) {
          newFormData.slug = generateSlug(title);
        }
        return newFormData;
      });
    },
    [isSlugManuallyEdited],
  );

  const handleSlugChange = useCallback((slug: string) => {
    setIsSlugManuallyEdited(true);
    setFormData((prev: IArticle) => ({ ...prev, slug: generateSlug(slug) }));
  }, []);

  const handleAddTag = useCallback(() => {
    setFormData((prev: IArticle) => {
      const normalized = tagInput.trim().toLowerCase();
      if (!normalized) return prev;

      const currentTags = prev.tags
        ? prev.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];
      if (currentTags.includes(normalized)) return prev;

      return { ...prev, tags: [...currentTags, normalized].join(", ") };
    });
    setTagInput("");
  }, [tagInput]);

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    setFormData((prev: IArticle) => {
      const currentTags = prev.tags
        ? prev.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];
      const newTags = currentTags.filter((tag) => tag !== tagToRemove);
      return { ...prev, tags: newTags.join(", ") };
    });
  }, []);

  const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  }, []);

  const onCropConfirm = useCallback((croppedBlob: Blob) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewImage(result);
      setFormData((prev: IArticle) => ({
        ...prev,
        coverImage: croppedBlob as Blob,
      }));
      setCropModalOpen(false);
      setSelectedImage(null);
    };
    reader.readAsDataURL(croppedBlob);
  }, []);

  const onCropCancel = useCallback(() => {
    setCropModalOpen(false);
    setSelectedImage(null);
  }, []);

  const handleRemoveImage = useCallback(() => {
    setPreviewImage(null);
    setFormData((prev: IArticle) => ({ ...prev, coverImage: null }));
  }, []);

  const resetForm = useCallback((data: Partial<IArticle>) => {
    setFormData((prev) => ({
      ...DEFAULT_ARTICLE_FORM_DATA,
      ...prev,
      ...data,
      title: data.title ?? prev.title ?? "",
      content: data.content ?? prev.content ?? "",
      summary: data.summary ?? prev.summary ?? "",
      slug: data.slug ?? prev.slug ?? "",
      tags: typeof data.tags === "string" ? data.tags : prev.tags ?? "",
      imageUrl: data.imageUrl ?? prev.imageUrl ?? "",
      metaTitle: data.metaTitle ?? prev.metaTitle ?? "",
      metaDescription: data.metaDescription ?? prev.metaDescription ?? "",
      status: data.status ?? prev.status ?? "DRAFT",
      workbench: data.workbench ?? prev.workbench ?? "",
      categories: data.categories ?? prev.categories ?? [],
      newCategories: data.newCategories ?? prev.newCategories ?? [],
      isFeatured: data.isFeatured ?? prev.isFeatured ?? false,
      isGlobal: data.isGlobal ?? prev.isGlobal ?? false,
    }));
    setPreviewImage(
      typeof data.coverImage === "string" 
        ? data.coverImage 
        : (data.imageUrl || null)
    );
    setIsSlugManuallyEdited(true);
  }, []);


  return {
    ids,
    formData,
    setField,
    handleTitleChange,
    handleSlugChange,
    tagInput,
    setTagInput,
    handleAddTag,
    handleRemoveTag,
    previewImage,
    handleImageChange,
    handleRemoveImage,
    aiPrompt,
    setAiPrompt,
    aiTone,
    setAiTone,
    resetForm,
    cropModalOpen,
    selectedImage,
    onCropConfirm,
    onCropCancel,
  };
}
