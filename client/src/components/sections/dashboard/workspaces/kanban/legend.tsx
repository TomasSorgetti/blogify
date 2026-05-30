const gates = [
  { color: "bg-chart-4", stage: "Idea", text: "Topic approval required" },
  { color: "bg-chart-1", stage: "Writing", text: "1500+ words and cover image" },
  { color: "bg-chart-3", stage: "Review", text: "Editor sign-off required" },
  { color: "bg-chart-2", stage: "Published", text: "SEO checklist completed" },
];

export default function KanbanLegend() {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="font-medium">Quality Gates</h3>
        <p className="text-xs text-muted-foreground">
          Each stage has validation checks before articles move forward.
        </p>
      </div>

      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
        {gates.map((gate) => (
          <div
            key={gate.stage}
            className="rounded-lg border border-border/60 bg-secondary/30 px-3 py-2"
          >
            <p className="flex items-center gap-2 text-sm font-medium">
              <span className={`h-2.5 w-2.5 rounded-full ${gate.color}`} />
              {gate.stage}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{gate.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
