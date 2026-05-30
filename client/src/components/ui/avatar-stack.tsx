import { UserIcon } from "lucide-react";
import { cn } from "../../lib/utils/tw-merge";
import type { IAuthor } from "../../types/article";
import type { IWorkbenchMember } from "../../types/workbench";

interface AvatarStackProps {
  users: (IAuthor | IWorkbenchMember)[];
  max?: number;
  className?: string;
}

export function AvatarStack({ users, max = 3, className }: AvatarStackProps) {
  const visibleUsers = users.slice(0, max);
  const remainingCount = Math.max(0, users.length - max);

  return (
    <div className={cn("flex -space-x-2 items-center", className)}>
      {visibleUsers.map((user, i) => {
        const avatarUrl =
          typeof user === "object"
            ? "userId" in user
              ? user.userId.avatar
              : user.avatar
            : null;

        return (
          <div
            key={i}
            className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center overflow-hidden ring-1 ring-foreground/20"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className={cn(
                  "flex h-full w-full items-center justify-center text-muted-foreground bg-secondary",
                  i === 0 && "bg-accent/10 text-accent",
                )}
              >
                <UserIcon className="h-3.5 w-3.5" />
              </div>
            )}
          </div>
        );
      })}

      {remainingCount > 0 && (
        <div className="flex h-7 w-7 rounded-full bg-secondary text-[10px] items-center justify-center font-bold text-muted-foreground ring-2 ring-card">
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
