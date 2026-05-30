import { useMemo, useState } from "react";
import { GripHorizontalIcon, PlusIcon, Loader2Icon } from "lucide-react";
import type { Column } from "../../../../../types/kanban";
import KanbanColumn from "./kanban-column";
import { useArticles } from "../../../../../hooks/queries/use-articles";
import { useMoveKanbanCard } from "../../../../../hooks/queries/use-kanban";
import { mapArticlesToColumns } from "../../../../../lib/utils/kanban-mapper";

const defaultColumnDefs: Column[] = [
  { id: "idea", title: "Idea", color: "bg-chart-4", cards: [] },
  { id: "writing", title: "Writing", color: "bg-chart-1", cards: [] },
  { id: "review", title: "Review", color: "bg-chart-3", cards: [] },
  { id: "published", title: "Published", color: "bg-chart-2", cards: [] },
];

export default function KanbanBoard({ workbenchId }: { workbenchId: string }) {
  const { data: articlesData, isLoading } = useArticles({
    workbenchId,
    limit: 100,
  });
  const moveCardMutation = useMoveKanbanCard();

  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const [sourceColumn, setSourceColumn] = useState<string | null>(null);

  const columns = useMemo(() => {
    return mapArticlesToColumns(articlesData?.data || [], defaultColumnDefs);
  }, [articlesData?.data]);

  const metrics = useMemo(() => {
    const totalCards = columns.reduce(
      (accumulator, column) => accumulator + column.cards.length,
      0,
    );
    const doneCards =
      columns.find((column) => column.id === "published")?.cards.length ?? 0;
    const completionRate =
      totalCards > 0 ? Math.round((doneCards / totalCards) * 100) : 0;

    return { totalCards, doneCards, completionRate };
  }, [columns]);

  function handleDragStart(cardId: string, columnId: string) {
    setDraggedCard(cardId);
    setSourceColumn(columnId);
  }

  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
  }

  async function handleDrop(targetColumnId: string) {
    if (!draggedCard || !sourceColumn || sourceColumn === targetColumnId) {
      setDraggedCard(null);
      setSourceColumn(null);
      return;
    }

    // Find the card being dragged
    const sourceCol = columns.find((c) => c.id === sourceColumn);
    const card = sourceCol?.cards.find((c) => c.id === draggedCard);

    if (card) {
      // Backend update (includes optimistic update via useMoveKanbanCard)
      try {
        await moveCardMutation.mutateAsync({
          slug: card.articleSlug,
          kanbanColumn: targetColumnId,
          workbenchId,
        });
      } catch (err) {
        console.error("Failed to move card:", err);
      }
    }

    setDraggedCard(null);
    setSourceColumn(null);
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/60 bg-secondary/20 px-3 py-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <GripHorizontalIcon className="h-3.5 w-3.5" />
          Drag and drop articles between stages.
        </div>
        <div className="flex items-center gap-3">
          <span>{metrics.totalCards} total</span>
          <span>{metrics.doneCards} published</span>
          <span>{metrics.completionRate}% completion</span>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            draggedCard={draggedCard}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}

        <div className="flex w-80 shrink-0 items-start">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border/70 bg-secondary/20 py-8 text-sm text-muted-foreground transition-colors hover:border-accent/35 hover:bg-accent/8 hover:text-foreground">
            <PlusIcon className="h-4 w-4" />
            Add custom column
          </button>
        </div>
      </div>
    </div>
  );
}
