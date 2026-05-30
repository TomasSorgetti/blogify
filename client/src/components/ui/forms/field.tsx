import type { ReactNode } from "react";
import CustomLabel from "./custom-label";

export default function Field({
  label,
  labelRight,
  htmlFor,
  required,
  hintId,
  hint,
  children,
}: {
  label: ReactNode;
  labelRight?: ReactNode;
  htmlFor: string;
  required?: boolean;
  hintId?: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <CustomLabel htmlFor={htmlFor} className="text-sm font-medium">
          {label}{" "}
          {required ? <span className="text-destructive">*</span> : null}
        </CustomLabel>
        {labelRight}
      </div>
      {children}
      {hint ? (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
