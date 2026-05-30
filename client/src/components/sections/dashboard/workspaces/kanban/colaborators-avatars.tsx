import type { Collaborator } from "../../../../../types/kanban";

export default function CollaboratorAvatars({
  collaborators,
}: {
  collaborators: Collaborator[];
}) {
  if (collaborators.length === 0) return null;

  return (
    <div className="flex -space-x-2">
      {collaborators.slice(0, 3).map((collaborator) => (
        <div key={collaborator.id} className="relative">
          <img
            src={collaborator.avatar}
            alt={collaborator.name}
            className="h-6 w-6 rounded-full border-2 border-card object-cover"
          />
          {collaborator.isOnline && (
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-400" />
          )}
        </div>
      ))}
      {collaborators.length > 3 && (
        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-card bg-secondary text-[10px] font-semibold text-muted-foreground">
          +{collaborators.length - 3}
        </div>
      )}
    </div>
  );
}
