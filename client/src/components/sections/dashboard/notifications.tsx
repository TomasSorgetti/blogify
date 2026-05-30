import {
  BellIcon,
  CheckCheckIcon,
  ExternalLinkIcon,
  Loader2Icon,
  Trash2Icon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNotificationStore } from "../../../lib/store/notifications";
import useClickOutside from "../../../hooks/useClickOutside";
import { cn } from "../../../lib/utils/tw-merge";

function formatRelativeDate(dateString: string): string {
  const value = new Date(dateString).getTime();
  if (Number.isNaN(value)) return "";

  const diffMs = value - Date.now();
  const diffMinutes = Math.round(diffMs / (1000 * 60));
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (Math.abs(diffMinutes) < 60) return formatter.format(diffMinutes, "minute");

  const diffHours = Math.round(diffMinutes / 60);
  if (Math.abs(diffHours) < 24) return formatter.format(diffHours, "hour");

  const diffDays = Math.round(diffHours / 24);
  if (Math.abs(diffDays) < 7) return formatter.format(diffDays, "day");

  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isExternalLink(link: string): boolean {
  return /^https?:\/\//i.test(link);
}

export default function Notifications() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { items, total, loading, removeNotification, markAllAsRead } =
    useNotificationStore();

  const unreadCount = useMemo(
    () => items.filter((item) => !item.read).length || total,
    [items, total],
  );

  useClickOutside(dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const handleDelete = async (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    event.preventDefault();
    await removeNotification(id);
  };

  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0) return;
    await markAllAsRead();
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="relative rounded-xl border border-transparent p-2 text-muted-foreground transition-all hover:border-border/70 hover:bg-secondary/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
      >
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full border border-background bg-accent px-1.5 py-0.5 text-[10px] font-semibold leading-none text-accent-foreground">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <section
          role="dialog"
          aria-label="Notifications"
          className="absolute right-0 top-12 z-50 w-[22rem] overflow-hidden rounded-2xl border border-border/70 bg-background/95 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Notifications
              </h3>
              <p className="text-xs text-muted-foreground">
                {unreadCount > 0
                  ? `${unreadCount} unread`
                  : "You're all caught up"}
              </p>
            </div>
            <button
              type="button"
              disabled={unreadCount === 0 || loading}
              onClick={handleMarkAllAsRead}
              className="inline-flex items-center gap-1 rounded-lg border border-border/70 bg-secondary/40 px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-accent/25 hover:bg-accent/10 hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckCheckIcon className="h-3.5 w-3.5" />
              Mark all read
            </button>
          </div>

          <ul className="max-h-[26rem] overflow-y-auto p-2">
            {loading && (
              <li className="flex items-center gap-2 rounded-xl px-3 py-4 text-sm text-muted-foreground">
                <Loader2Icon className="h-4 w-4 animate-spin" />
                Loading notifications...
              </li>
            )}

            {!loading && items.length === 0 && (
              <li className="rounded-xl border border-dashed border-border/70 px-3 py-8 text-center">
                <BellIcon className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">
                  No notifications yet
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Activity from your workspaces appears here.
                </p>
              </li>
            )}

            {!loading &&
              items.map(({ _id: id, link, message, read, createdAt }) => {
                const WrapperClass = cn(
                  "relative flex-1 rounded-lg pr-1 text-left text-sm transition-colors",
                  read ? "text-muted-foreground" : "text-foreground",
                );

                return (
                  <li key={id} className="mb-1 last:mb-0">
                    <div
                      id={`notification-${id}`}
                      className={cn(
                        "group flex items-start gap-3 rounded-xl border px-3 py-2.5 transition-colors",
                        read
                          ? "border-border/50 bg-transparent hover:bg-secondary/35"
                          : "border-accent/25 bg-accent/[0.07] hover:bg-accent/[0.12]",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                          read ? "bg-border/80" : "bg-accent",
                        )}
                      />

                      <div className="min-w-0 flex-1">
                        {link ? (
                          isExternalLink(link) ? (
                            <a
                              href={link}
                              target="_blank"
                              rel="noreferrer"
                              className={WrapperClass}
                            >
                              {message}
                            </a>
                          ) : (
                            <Link to={link} className={WrapperClass}>
                              {message}
                            </Link>
                          )
                        ) : (
                          <p className={WrapperClass}>{message}</p>
                        )}

                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatRelativeDate(createdAt)}
                        </p>
                      </div>

                      <div className="mt-0.5 flex items-center gap-1">
                        {link && isExternalLink(link) && (
                          <ExternalLinkIcon className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                        <button
                          type="button"
                          onClick={(event) => void handleDelete(event, id)}
                          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          aria-label="Delete notification"
                        >
                          <Trash2Icon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </section>
      )}
    </div>
  );
}
