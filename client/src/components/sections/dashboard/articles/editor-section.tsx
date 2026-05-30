import SparklesIcon from "../../../ui/icons/sparkles-icon";
import CustomInput from "../../../ui/forms/custom-input";
import CustomTextarea from "../../../ui/forms/custom-textarea";
import Field from "../../../ui/forms/field";
import { clampText } from "../../../../lib/utils/article";
import type { IArticle, SetArticleField } from "../../../../types/article";

interface EditorSectionProps {
  formData: IArticle;
  hasAiAccess: boolean;
  onTitleChange: (title: string) => void;
  onSlugChange: (slug: string) => void;
  setField: SetArticleField;
}

export function EditorSection({
  formData,
  hasAiAccess,
  onTitleChange,
  onSlugChange,
  setField,
}: EditorSectionProps) {
  const wordCount = formData.content.trim()
    ? formData.content.trim().split(/\s+/).length
    : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <section className="flex h-full flex-col space-y-6 lg:col-span-8" aria-label="Editor">
      <div className="rounded-xl border border-border/70 bg-card/65 p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-border/70 bg-secondary/45 px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            {wordCount} words
          </span>
          <span className="rounded-full border border-border/70 bg-secondary/45 px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            ~{readingTime} min read
          </span>
          {hasAiAccess && (
            <span className="inline-flex items-center gap-1 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
              <SparklesIcon className="h-3.5 w-3.5" />
              AI tools enabled
            </span>
          )}
        </div>

        <Field label="Title" htmlFor="title" required>
          <CustomInput
            id="title"
            value={formData.title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Enter article title..."
            required
            className="h-12 bg-secondary text-lg font-medium"
          />
        </Field>

        <Field
          label="Slug"
          htmlFor="slug"
          hint="Auto-generated from title. Edit to customize."
        >
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">/blog/</span>
            <CustomInput
              id="slug"
              value={formData.slug}
              onChange={(e) => onSlugChange(e.target.value)}
              placeholder="my-article-slug"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              className="bg-secondary"
            />
          </div>
        </Field>
      </div>

      <div className="rounded-xl border border-border/70 bg-card/65 p-4 sm:p-5">
        <Field
          label="Content"
          htmlFor="content"
          required
          hintId="content-hint"
          hint="Supports Markdown formatting. Use headings, lists, links and emphasis."
        >
          <CustomTextarea
            id="content"
            value={formData.content}
            onChange={(e) => setField("content", e.target.value)}
            placeholder="Write your article content here... (Supports Markdown)"
            required
            aria-describedby="content-hint"
            className="min-h-[560px] bg-secondary font-mono text-sm leading-relaxed"
          />
        </Field>
      </div>

      <div className="rounded-xl border border-border/70 bg-card/65 p-4 sm:p-5">
        <Field
          label="Summary"
          htmlFor="summary"
          hint={`${formData.summary.length}/300 characters`}
        >
          <CustomTextarea
            id="summary"
            value={formData.summary}
            onChange={(e) =>
              setField("summary", clampText(e.target.value, 300))
            }
            placeholder="A brief summary of your article (displayed in previews)..."
            className="min-h-[120px] bg-secondary"
          />
        </Field>
      </div>
    </section>
  );
}
