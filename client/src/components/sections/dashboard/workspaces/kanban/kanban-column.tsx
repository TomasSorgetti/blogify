import { PlusIcon, SettingsIcon } from "lucide-react";
import { cn } from "../../../../../lib/utils/tw-merge";
import type { Column } from "../../../../../types/kanban";
import KanbanCard from "./kanban-card";

export default function KanbanColumn({
  column,
  draggedCard,
  onDragStart,
  onDragOver,
  onDrop,
}: {
  column: Column;
  draggedCard: string | null;
  onDragStart: (cardId: string, columnId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (columnId: string) => void;
}) {
  const completedTasks = column.cards.reduce(
    (accumulator, card) =>
      accumulator + card.checklist.filter((check) => check.checked).length,
    0,
  );
  const totalTasks = column.cards.reduce(
    (accumulator, card) => accumulator + card.checklist.length,
    0,
  );
  const completionPercent =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <article
      onDragOver={onDragOver}
      onDrop={() => onDrop(column.id)}
      className="flex min-h-144 w-80 shrink-0 flex-col rounded-xl border border-border/70 bg-card/60"
    >
      <header className="border-b border-border/60 p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className={cn("h-2.5 w-2.5 rounded-full", column.color)} />
            <h3 className="truncate font-semibold">{column.title}</h3>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-border/70 bg-secondary/45 px-1 text-xs text-muted-foreground">
              {column.cards.length}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {column.isCustom && (
              <button className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground">
                <SettingsIcon className="h-4 w-4" />
              </button>
            )}
            <button className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground">
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {totalTasks > 0 && (
          <div className="mt-3 rounded-md border border-border/60 bg-secondary/30 px-2 py-1.5">
            <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>
                {completedTasks}/{totalTasks} tasks complete
              </span>
              <span>{completionPercent}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-secondary/80">
              <div
                className={cn("h-full rounded-full", column.color)}
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>
        )}
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto p-3">
        {column.cards.map((card) => (
          <KanbanCard
            key={card.id}
            card={card}
            isDragging={draggedCard === card.id}
            onDragStart={() => onDragStart(card.id, column.id)}
          />
        ))}

        {column.cards.length === 0 && (
          <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-border/70 text-sm text-muted-foreground">
            Drop articles here
          </div>
        )}
      </div>

      <footer className="border-t border-border/60 p-3">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border/70 py-2 text-sm text-muted-foreground transition-colors hover:border-accent/35 hover:bg-accent/8 hover:text-foreground">
          <PlusIcon className="h-4 w-4" />
          Add article
        </button>
      </footer>
    </article>
  );
}
