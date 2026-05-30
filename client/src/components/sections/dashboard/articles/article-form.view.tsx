import type { ChangeEvent } from "react";
import AiHeroArea from "./ai-hero";
import { FormHeader } from "./form-header";
import { EditorSection } from "./editor-section";
import { MetadataSidebar } from "./metadata-sidebar";
import type {
  IArticle,
  ArticleFormViewIds,
  SetArticleField,
  VoiceTone,
} from "../../../../types/article";
import type { IWorkbench } from "../../../../types/workbench";

export default function ArticleFormView({
  mode,
  ids,
  isSubmitting,
  formData,
  tagInput,
  workbenches,
  previewImage,
  aiPrompt,
  aiTone,
  backHref,
  onSaveDraft,
  onPublish,
  onTitleChange,
  onSlugChange,
  setField,
  onAddTag,
  onRemoveTag,
  onTagInputChange,
  onImageChange,
  onRemoveImage,
  onAiGenerate,
  onAiPromptChange,
  onAiToneChange,
  role,
  hasAiAccess,
  hasReachedLimit,
}: {
  mode: "create" | "edit";
  ids: ArticleFormViewIds;
  isSubmitting: boolean;
  formData: IArticle;
  tagInput: string;
  workbenches: IWorkbench[];
  previewImage: string | null;
  aiPrompt: string;
  aiTone: VoiceTone;
  backHref?: string;
  role: string;
  hasAiAccess: boolean;
  hasReachedLimit: boolean;
  onSaveDraft: () => void;
  onPublish: () => void;
  onTitleChange: (title: string) => void;
  onSlugChange: (slug: string) => void;
  setField: SetArticleField;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onTagInputChange: (value: string) => void;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  onAiGenerate: () => void;
  onAiPromptChange: (value: string) => void;
  onAiToneChange: (tone: VoiceTone) => void;
}) {
  return (
    <div className="min-h-screen bg-background">
      <FormHeader
        mode={mode}
        ids={ids}
        isSubmitting={isSubmitting}
        formData={formData}
        backHref={backHref}
        hasReachedLimit={hasReachedLimit}
        onSaveDraft={onSaveDraft}
      />

      <main className="mx-auto max-w-7xl px-4 pb-10 pt-6 lg:px-8">
        <form
          id={ids.form}
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            onPublish();
          }}
        >
          <AiHeroArea
            titleId={ids.aiHeroTitle}
            promptId={ids.aiPrompt}
            toneLabelId={ids.aiToneLabel}
            promptValue={aiPrompt}
            onPromptChange={onAiPromptChange}
            toneValue={aiTone}
            onToneChange={onAiToneChange}
            onGenerate={onAiGenerate}
            isLocked={!hasAiAccess}
          />

          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <EditorSection
              formData={formData}
              hasAiAccess={hasAiAccess}
              onTitleChange={onTitleChange}
              onSlugChange={onSlugChange}
              setField={setField}
            />

            <MetadataSidebar
              ids={ids}
              formData={formData}
              workbenches={workbenches}
              previewImage={previewImage}
              tagInput={tagInput}
              role={role}
              hasAiAccess={hasAiAccess}
              setField={setField}
              onImageChange={onImageChange}
              onRemoveImage={onRemoveImage}
              onTagInputChange={onTagInputChange}
              onAddTag={onAddTag}
              onRemoveTag={onRemoveTag}
            />
          </div>
        </form>
      </main>
    </div>
  );
}
