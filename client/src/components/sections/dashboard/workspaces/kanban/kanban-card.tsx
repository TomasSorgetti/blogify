import {
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ImageIcon,
  GripVerticalIcon,
} from "lucide-react";
import { useState } from "react";
import { cn } from "../../../../../lib/utils/tw-merge";
import type { ArticleCard } from "../../../../../types/kanban";
import ArticleIcon from "../../../../ui/icons/article-icon";
import ChecklistProgress from "./check-list-progress";
import CollaboratorAvatars from "./colaborators-avatars";
import PriorityBadge from "./priority-badge";

export default function KanbanCard({
  card,
  isDragging,
  onDragStart,
}: {
  card: ArticleCard;
  isDragging: boolean;
  onDragStart: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article
      draggable
      onDragStart={onDragStart}
      className={cn(
        "group cursor-grab rounded-lg border border-border/70 bg-card p-3 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md active:cursor-grabbing",
        isDragging && "scale-[1.03] rotate-1 opacity-90 shadow-xl",
      )}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h4 className="line-clamp-2 text-sm font-semibold leading-tight">
            {card.title}
          </h4>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
            {card.excerpt}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <PriorityBadge priority={card.priority} />
          <GripVerticalIcon className="h-4 w-4 text-muted-foreground/70" />
        </div>
      </div>

      {card.coverImage && (
        <div className="relative mb-3 overflow-hidden rounded-md border border-border/60">
          <img src={card.coverImage} alt="" className="h-24 w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-card/70 to-transparent" />
        </div>
      )}

      <div className="mb-3 flex flex-wrap gap-1.5">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-border/70 bg-secondary/40 px-1.5 py-0.5 text-[11px] text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <ChecklistProgress checklist={card.checklist} />

      <button
        onClick={() => setIsExpanded((value) => !value)}
        className="mt-2 flex w-full items-center justify-center gap-1 rounded-md border border-transparent bg-secondary/40 py-1 text-[11px] text-muted-foreground transition-colors hover:border-border/70 hover:bg-secondary/60 hover:text-foreground"
      >
        <span>{isExpanded ? "Hide" : "Show"} checklist</span>
        <ChevronDownIcon
          className={cn("h-3 w-3 transition-transform", isExpanded && "rotate-180")}
        />
      </button>

      {isExpanded && (
        <div className="mt-2 space-y-1.5 border-t border-border/60 pt-2">
          {card.checklist.map((item) => (
            <label key={item.id} className="flex items-center gap-2 text-xs">
              <span
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded border",
                  item.checked
                    ? "border-emerald-500 bg-emerald-500"
                    : "border-border/70 bg-secondary/50",
                )}
              >
                {item.checked && <CheckIcon className="h-3 w-3 text-background" />}
              </span>
              <span
                className={cn(
                  "text-muted-foreground",
                  item.checked && "line-through opacity-80",
                )}
              >
                {item.label}
              </span>
              {item.required && !item.checked && (
                <span className="text-destructive">*</span>
              )}
            </label>
          ))}
        </div>
      )}

      <footer className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <ArticleIcon className="h-3 w-3" />
            {card.wordCount > 0
              ? `${card.wordCount.toLocaleString()} words`
              : "Draft"}
          </span>
          {card.coverImage && (
            <span className="inline-flex items-center gap-1">
              <ImageIcon className="h-3 w-3" />
              Cover
            </span>
          )}
          {card.dueDate && (
            <span className="inline-flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              {new Date(card.dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
        </div>
        <CollaboratorAvatars collaborators={card.collaborators} />
      </footer>
    </article>
  );
}
