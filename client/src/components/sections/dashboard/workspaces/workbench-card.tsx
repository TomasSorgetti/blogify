import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArchiveIcon,
  ArrowUpRightIcon,
  CalendarClockIcon,
  MoreHorizontalIcon,
  PencilIcon,
  ShieldCheckIcon,
  Trash2Icon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import type { IWorkbench, IWorkbenchMember } from "../../../../types/workbench";
import type { IAuthor } from "../../../../types/article";
import ArticleIcon from "../../../ui/icons/article-icon";
import { ConfirmDialog } from "../../../ui/confirm-dialog";
import { useAuthStore } from "../../../../lib/store/auth";
import Badge from "../../../ui/badge";
import { AvatarStack } from "../../../ui/avatar-stack";
import { useDeleteWorkspace } from "../../../../hooks/queries/use-workspaces";

const WORKSPACE_GRADIENTS = [
  "from-violet-500 to-purple-600 shadow-violet-500/20",
  "from-sky-500 to-blue-600 shadow-sky-500/20",
  "from-emerald-500 to-teal-600 shadow-emerald-500/20",
  "from-amber-500 to-orange-600 shadow-amber-500/20",
  "from-rose-500 to-pink-600 shadow-rose-500/20",
  "from-indigo-500 to-blue-700 shadow-indigo-500/20",
];

function pickGradient(seed: string): string {
  const index = seed.charCodeAt(0) % WORKSPACE_GRADIENTS.length;
  return WORKSPACE_GRADIENTS[index];
}

function formatDate(dateString?: string): string | null {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface WorkbenchCardProps {
  workbench: IWorkbench;
}

export function WorkbenchCard({ workbench }: WorkbenchCardProps) {
  const { mutateAsync: deleteWorkbench } = useDeleteWorkspace();
  const { user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string | null>(
    null,
  );

  const workbenchId = workbench._id!;
  const gradient = pickGradient(workbench.name);
  const articlesCount = workbench.articlesCount ?? 0;
  const updatedAtLabel = formatDate(workbench.updatedAt ?? workbench.createdAt);

  const displayUsers = useMemo(() => {
    const owner = workbench.owner;
    const members = workbench.members || [];
    const ownerId = typeof owner === "object" ? owner?._id : owner;

    const list: (IAuthor | IWorkbenchMember)[] = [];
    if (owner && typeof owner === "object") list.push(owner);

    members.forEach((member: IWorkbenchMember) => {
      const memberUserId =
        typeof member.userId === "object"
          ? member.userId?._id
          : member.userId;
      if (memberUserId !== ownerId) {
        list.push(member);
      }
    });

    return list;
  }, [workbench.owner, workbench.members]);

  const isOwner =
    typeof workbench.owner === "object"
      ? workbench.owner?._id === user?._id
      : workbench.owner === user?._id;

  const membersCount = displayUsers.length;

  const handleDeleteRequest = () => {
    setIsMenuOpen(false);

    if (articlesCount > 0) {
      setDeleteErrorMessage(
        `Workspace contains active content (${articlesCount} article${articlesCount !== 1 ? "s" : ""}). Clear the articles first.`,
      );
      setTimeout(() => setDeleteErrorMessage(null), 5000);
      return;
    }

    setIsConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsConfirmOpen(false);
    try {
      await deleteWorkbench(workbenchId);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not delete workspace.";
      setDeleteErrorMessage(message);
    }
  };

  return (
    <>
      <article
        className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/75 p-6 backdrop-blur-md transition-all duration-300 hover:border-accent/35 hover:bg-card hover:shadow-xl hover:shadow-accent/10 ${workbench.isArchived ? "opacity-65 grayscale-[0.35] hover:translate-y-0" : "hover:-translate-y-1.5"}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-accent/4 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {!workbench.isArchived && (
          <Link
            to={`/dashboard/workspaces/${workbenchId}`}
            className="absolute inset-0 z-10 rounded-2xl"
            aria-label={`Open ${workbench.name} workspace`}
          />
        )}

        <div className="relative z-30 flex items-start justify-between gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br shadow-lg ${gradient}`}
          >
            <span className="text-lg font-bold text-white drop-shadow-md">
              {workbench.name[0].toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isOwner ? (
              <Badge variant="accent">
                <ShieldCheckIcon className="h-3 w-3" />
                Owner
              </Badge>
            ) : (
              <Badge variant="secondary">
                <UserIcon className="h-3 w-3" />
                Member
              </Badge>
            )}

            <div className="relative">
              {workbench.isArchived ? (
                <Badge variant="destructive" className="group/badge">
                  <ArchiveIcon className="h-3 w-3" />
                  Archived
                  <div className="pointer-events-none absolute top-full z-50 mt-2 w-48 rounded bg-foreground p-2 text-xs text-background opacity-0 transition-opacity group-hover/badge:opacity-100">
                    This workspace is archived. Upgrade your plan to reactivate
                    it.
                  </div>
                </Badge>
              ) : (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen((prev) => !prev);
                    }}
                    className="rounded-lg border border-transparent p-1.5 text-muted-foreground transition-all hover:border-border/70 hover:bg-secondary/60 hover:text-foreground active:scale-95 sm:opacity-0 sm:group-hover:opacity-100"
                    aria-label="Workspace options"
                  >
                    <MoreHorizontalIcon className="h-4 w-4" />
                  </button>

                  {isMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-20"
                        onClick={() => setIsMenuOpen(false)}
                      />
                      <nav
                        className="absolute right-0 top-10 z-30 min-w-(--spacing-40) overflow-hidden rounded-xl border border-white/10 bg-card/80 p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200"
                        role="menu"
                      >
                        <button
                          role="menuitem"
                          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-accent/10 hover:text-accent"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsMenuOpen(false);
                          }}
                        >
                          <PencilIcon className="h-4 w-4" />
                          Rename
                        </button>
                        <button
                          role="menuitem"
                          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDeleteRequest();
                          }}
                        >
                          <Trash2Icon className="h-4 w-4" />
                          Delete
                        </button>
                      </nav>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="relative z-0 mt-5 space-y-2">
          <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">
            {workbench.name}
          </h3>
          <p className="line-clamp-2 min-h-[40px] text-sm leading-relaxed text-muted-foreground/80">
            {workbench.description ||
              "No description provided for this workspace."}
          </p>
        </div>

        <div className="relative z-20 mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-secondary/35 px-3 py-2 transition-colors group-hover:bg-secondary/55">
            <ArticleIcon className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-foreground">
              {articlesCount}
            </span>
            <span className="text-xs text-muted-foreground">
              {articlesCount === 1 ? "article" : "articles"}
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-secondary/35 px-3 py-2 transition-colors group-hover:bg-secondary/55">
            <UsersIcon className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-foreground">
              {membersCount}
            </span>
            <span className="text-xs text-muted-foreground">
              {membersCount === 1 ? "member" : "members"}
            </span>
          </div>
        </div>

        <div className="relative z-20 mt-4 flex items-center justify-between gap-3 border-t border-border/60 pt-4">
          <AvatarStack users={displayUsers} max={3} />
          {updatedAtLabel && (
            <span className="inline-flex items-center gap-1 rounded-md bg-secondary/40 px-2 py-1 text-xs text-muted-foreground">
              <CalendarClockIcon className="h-3 w-3" />
              Updated {updatedAtLabel}
            </span>
          )}
        </div>

        {!workbench.isArchived && (
          <div className="relative z-20 mt-4 flex items-center justify-end text-xs font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-secondary/35 px-2.5 py-1 transition-colors group-hover:border-accent/30 group-hover:text-accent">
              Open workspace
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </span>
          </div>
        )}

        {deleteErrorMessage && (
          <div
            role="alert"
            className="mt-4 animate-in slide-in-from-top-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs font-medium text-destructive duration-300"
          >
            {deleteErrorMessage}
          </div>
        )}
      </article>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete Workspace"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-bold text-foreground">
              "{workbench.name}"
            </span>
            ? This action is permanent and cannot be undone.
          </>
        }
        confirmLabel="Delete Workspace"
        isDestructive
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  );
}
