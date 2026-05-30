import { useNavigate, useParams } from "react-router-dom";
import ArticleFormView from "./article-form.view";
import { Modal } from "../../../ui/modal";
import { ImageCropper } from "../../../ui/image-cropper";
import {
  generateSlug,
  useArticleForm,
} from "../../../../hooks/use-article-form";
import type { IArticle } from "../../../../types/article";
import { useAuthStore } from "../../../../lib/store/auth";
import { usePlanLimits } from "../../../../hooks/use-plan-limits";
import { 
  useCreateArticle, 
  useUpdateArticle, 
  useGenerateAiArticle,
  useArticles
} from "../../../../hooks/queries/use-articles";

interface ArticleFormProps {
  initialData?: Partial<IArticle>;
  mode: "create" | "edit";
  articleSlug?: string;
}

export default function ArticleForm({
  initialData,
  mode,
  articleSlug,
}: ArticleFormProps) {
  const navigate = useNavigate();
  const { workbenchId } = useParams<{ workbenchId: string }>();
  
  const { user } = useAuthStore();
  const { mutateAsync: createArticle, isPending: isCreating } = useCreateArticle();
  const { mutateAsync: updateArticle, isPending: isUpdating } = useUpdateArticle();
  const { mutateAsync: generateAiArticle, isPending: isGenerating } = useGenerateAiArticle();

  const { data: articlesData } = useArticles({ workbenchId: workbenchId ?? "", limit: 1 });
  const totalArticles = articlesData?.pagination?.totalItems ?? 0;

  const { hasAiTools, maxArticlesPerWorkbench, isUnlimited } = usePlanLimits();

  const unlimitedArticles = isUnlimited("articlesPerWorkbench");
  const hasReachedArticleLimit = mode === "create" && !unlimitedArticles && totalArticles >= maxArticlesPerWorkbench;

  const {
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
  } = useArticleForm({ ...initialData, workbench: workbenchId ?? initialData?.workbench ?? "" });

  const redirectToWorkbench = () => {
    navigate(`/dashboard/workspaces/${workbenchId}`);
  };

  const submit = async (asDraft: boolean) => {
    const submitData: IArticle = {
      ...formData,
      workbench: workbenchId ?? formData.workbench,
      status: asDraft ? "DRAFT" : formData.status,
    };

    try {
      if (mode === "create") {
        await createArticle(submitData);
      } else if (articleSlug) {
        await updateArticle({ slug: articleSlug, payload: submitData });
      }
      redirectToWorkbench();
    } catch {
      // Error handled by mutation hooks (toast)
    }
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim() || aiPrompt.trim().length < 10) return;

    try {
      const data = await generateAiArticle({ prompt: aiPrompt, tone: aiTone });
      if (data) {
        const aiArticle: Partial<IArticle> = {
          ...data,
          slug: generateSlug(data.title || ""),
          status: "DRAFT",
          isFeatured: false,
          coverImage: null,
          imageUrl: "",
          workbench: workbenchId ?? formData.workbench,
        };

        resetForm(aiArticle);
      }
    } catch {
      // Error handled by mutation hooks (toast)
    }
  };

  const isSubmitting = isCreating || isUpdating || isGenerating;

  return (
    <>
      <ArticleFormView
        mode={mode}
        ids={ids}
        isSubmitting={isSubmitting}
        formData={formData}
        tagInput={tagInput}
        workbenches={[]}
        previewImage={previewImage}
        aiPrompt={aiPrompt}
        aiTone={aiTone}
        backHref={`/dashboard/workspaces/${workbenchId}`}
        onSaveDraft={() => submit(true)}
        onPublish={() => submit(false)}
        onTitleChange={handleTitleChange}
        onSlugChange={handleSlugChange}
        setField={setField}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        onTagInputChange={setTagInput}
        onImageChange={handleImageChange}
        onRemoveImage={handleRemoveImage}
        onAiGenerate={handleAiGenerate}
        onAiPromptChange={setAiPrompt}
        onAiToneChange={setAiTone}
        role={user?.role || "user"}
        hasAiAccess={hasAiTools}
        hasReachedLimit={hasReachedArticleLimit}
      />

      <Modal
        isOpen={cropModalOpen}
        onClose={onCropCancel}
        title="Crop cover image"
        maxWidth="max-w-2xl"
      >
        {selectedImage && (
          <ImageCropper
            image={selectedImage}
            onCropComplete={onCropConfirm}
            onCancel={onCropCancel}
            aspect={16 / 9}
          />
        )}
      </Modal>
    </>
  );
}
