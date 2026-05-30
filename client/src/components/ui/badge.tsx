import { cn } from "../../lib/utils/tw-merge";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "secondary" | "destructive" | "outline";
  className?: string;
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-secondary/50 border-border text-muted-foreground",
    accent: "bg-accent/10 border-accent/20 text-accent font-bold uppercase tracking-wider",
    secondary: "bg-secondary/50 border-border/50 text-muted-foreground font-bold uppercase tracking-wider",
    destructive: "bg-destructive/10 border-destructive/20 text-destructive font-bold uppercase tracking-wider",
    outline: "bg-transparent border-border text-muted-foreground",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] transition-colors",
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
