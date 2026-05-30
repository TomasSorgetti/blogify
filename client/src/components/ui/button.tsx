import React from "react";

type ButtonVariant = "default" | "destructive" | "outline" | "ghost" | "accent" | "none";
type ButtonSize = "default" | "sm" | "md" | "lg" | "icon";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

type ButtonProps<T extends React.ElementType> = BaseProps &
  Omit<React.ComponentPropsWithoutRef<T>, keyof BaseProps>;

export const Button = <T extends React.ElementType = "button">({
  children,
  variant = "default",
  size = "default",
  className = "",
  as,
  ...props
}: ButtonProps<T>) => {
  const Component = as || (props.href ? "a" : "button");

  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-offset-1 cursor-pointer";

  const variants: Record<ButtonVariant, string> = {
    default: "bg-white text-background hover:opacity-90",
    destructive:
      "bg-red-600 text-foreground hover:bg-red-700 focus:ring-red-400",
    outline:
      "border border-border text-font bg-border/30 hover:bg-border/60 focus:ring-border/30",
    ghost:
      "text-muted-foreground hover:bg-accent/60 hover:text-foreground focus:ring-slate-100",
    accent: "bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20",
    none: "",
  };

  const sizes: Record<ButtonSize, string> = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-8 text-base",
    icon: "h-10 w-10",
  };

  const combinedClasses = `
    ${baseStyles} 
    ${variants[variant]} 
    ${sizes[size]} 
    ${className}
  `
    .replace(/\s+/g, " ")
    .trim();

  return (
    <Component className={combinedClasses} {...props}>
      {children}
    </Component>
  );
};
