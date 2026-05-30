import type { ChangeEvent } from "react";
import { ImageIcon, SparklesIcon, XIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../ui/cards/card";
import CustomLabel from "../../../ui/forms/custom-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/forms/custom-select";
import { Switch } from "../../../ui/forms/custom-switch";
import CustomInput from "../../../ui/forms/custom-input";
import CustomTextarea from "../../../ui/forms/custom-textarea";
import { Button } from "../../../ui/button";
import { ARTICLE_CATEGORIES } from "../../../../constants/article";
import { clampText } from "../../../../lib/utils/article";
import type {
  IArticle,
  ArticleFormViewIds,
  ArticleStatus,
  SetArticleField,
} from "../../../../types/article";
import type { IWorkbench } from "../../../../types/workbench";

interface MetadataSidebarProps {
  ids: ArticleFormViewIds;
  formData: IArticle;
  workbenches: IWorkbench[];
  previewImage: string | null;
  tagInput: string;
  role: string;
  hasAiAccess: boolean;
  setField: SetArticleField;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  onTagInputChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
}

export function MetadataSidebar({
  ids,
  formData,
  workbenches,
  previewImage,
  tagInput,
  role,
  hasAiAccess,
  setField,
  onImageChange,
  onRemoveImage,
  onTagInputChange,
  onAddTag,
  onRemoveTag,
}: MetadataSidebarProps) {
  const tagsArray = formData.tags
    ? formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  return (
    <aside
      className="flex h-full flex-col space-y-3 self-stretch lg:col-span-4 lg:sticky lg:top-24"
      aria-label="Metadata"
    >
      <Card className="gap-3 border-border/70 bg-card/75 py-5 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Organization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!formData.isGlobal && workbenches.length > 0 && (
            <div className="space-y-2">
              <CustomLabel className="text-xs text-muted-foreground">
                Workspace
              </CustomLabel>
              <Select
                value={formData.workbench}
                onValueChange={(value) => setField("workbench", value)}
              >
                <SelectTrigger className="w-full bg-secondary">
                  <SelectValue placeholder="Select workspace" />
                </SelectTrigger>
                <SelectContent className="border-border bg-popover">
                  {workbenches
                    ?.filter((workbench) => workbench._id)
                    .map((workbench) => (
                      <SelectItem
                        key={workbench._id}
                        value={workbench._id || ""}
                      >
                        {workbench.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <CustomLabel id={ids.statusLabel} className="text-xs text-muted-foreground">
              Publication status
            </CustomLabel>
            <Select
              value={formData.status}
              onValueChange={(value: ArticleStatus) => setField("status", value)}
            >
              <SelectTrigger className="w-full bg-secondary" aria-labelledby={ids.statusLabel}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="border-border bg-popover">
                <SelectItem value="DRAFT">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-500" />
                    Draft
                  </div>
                </SelectItem>
                <SelectItem value="PUBLISHED">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Published
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border/60 bg-secondary/30 px-3 py-2">
            <CustomLabel htmlFor="isFeatured" className="text-sm">
              Featured article
            </CustomLabel>
            <Switch
              id="isFeatured"
              checked={formData.isFeatured}
              onCheckedChange={(checked) => setField("isFeatured", checked)}
              className="data-[state=checked]:bg-accent"
            />
          </div>

          {role === "admin" && (
            <div className="flex items-center justify-between rounded-lg border border-border/60 bg-secondary/30 px-3 py-2">
              <CustomLabel htmlFor="isGlobal" className="text-sm">
                Global (Public)
              </CustomLabel>
              <Switch
                id="isGlobal"
                checked={formData.isGlobal}
                onCheckedChange={(checked) => setField("isGlobal", checked)}
                className="data-[state=checked]:bg-accent"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="gap-3 border-border/70 bg-card/75 py-5 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Cover Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {previewImage || formData.coverImage ? (
            <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
              <img
                src={previewImage || formData.coverImage || "/placeholder.svg"}
                alt="Cover preview"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={onRemoveImage}
                aria-label="Remove cover image"
                className="absolute right-2 top-2 rounded-full bg-background/80 p-1 transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <CustomLabel
                htmlFor="coverImage"
                className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50 transition-colors hover:border-accent/40 hover:bg-secondary"
              >
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                <span className="mt-2 text-sm text-muted-foreground">
                  Click to upload
                </span>
                <span className="text-xs text-muted-foreground">
                  PNG, JPG up to 5MB
                </span>
                <CustomInput
                  id="coverImage"
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  className="hidden"
                />
              </CustomLabel>

              <div className="flex items-center justify-center gap-1">
                <div className="h-px w-full bg-border" />
                <p className="w-full text-center text-xs uppercase text-muted-foreground">
                  Or use URL
                </p>
                <div className="h-px w-full bg-border" />
              </div>

              <CustomInput
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={(e) => setField("imageUrl", e.target.value)}
                className="bg-secondary"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="gap-3 border-border/70 bg-card/75 py-5 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <CustomLabel id={ids.categoryLabel} className="text-xs text-muted-foreground">
            Article category
          </CustomLabel>
          <Select
            value={
              typeof formData.categories[0] === "string"
                ? formData.categories[0]
                : formData.categories[0]?.name || ""
            }
            onValueChange={(value) => setField("categories", [value])}
          >
            <SelectTrigger className="w-full bg-secondary" aria-labelledby={ids.categoryLabel}>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="border-border bg-popover">
              {ARTICLE_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="gap-3 border-border/70 bg-card/75 py-5 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <CustomLabel htmlFor={ids.tags} className="text-xs text-muted-foreground">
            Search tags
          </CustomLabel>
          <div className="flex gap-2">
            <CustomInput
              id={ids.tags}
              value={tagInput}
              onChange={(e) => onTagInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onAddTag();
                }
              }}
              placeholder="Add a tag..."
              className="bg-secondary"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onAddTag}
              disabled={!tagInput.trim()}
            >
              Add
            </Button>
          </div>
          {tagsArray.length > 0 && (
            <div className="flex flex-wrap gap-2" aria-label="Selected tags">
              {tagsArray.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs text-accent"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => onRemoveTag(tag)}
                    aria-label={`Remove tag ${tag}`}
                    className="ml-1 rounded-sm transition-colors hover:text-foreground"
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="gap-3 border-border/70 bg-card/75 py-5 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-sm font-semibold">SEO Settings</CardTitle>
            {hasAiAccess && (
              <span className="inline-flex items-center gap-1 rounded-full border border-accent/25 bg-accent/10 px-2 py-1 text-[11px] font-semibold text-accent">
                <SparklesIcon className="h-3 w-3" />
                AI ready
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <CustomLabel htmlFor="metaTitle" className="text-xs text-muted-foreground">
              Meta title
            </CustomLabel>
            <CustomInput
              id="metaTitle"
              value={formData.metaTitle}
              onChange={(e) => setField("metaTitle", clampText(e.target.value, 60))}
              placeholder={formData.title || "Article title"}
              className="bg-secondary"
            />
            <p className="text-xs text-muted-foreground">
              {(formData.metaTitle || formData.title).length}/60
            </p>
          </div>
          <div className="space-y-2">
            <CustomLabel htmlFor="metaDescription" className="text-xs text-muted-foreground">
              Meta description
            </CustomLabel>
            <CustomTextarea
              id="metaDescription"
              value={formData.metaDescription}
              onChange={(e) => setField("metaDescription", clampText(e.target.value, 300))}
              placeholder={formData.summary || "Brief description for search engines..."}
              className="min-h-20 bg-secondary"
            />
            <p className="text-xs text-muted-foreground">
              {(formData.metaDescription || formData.summary).length}/300
            </p>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
