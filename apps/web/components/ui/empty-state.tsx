import { Construction } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  icon?: ReactNode;
}

/**
 * Elegant placeholder panel used by sections whose content will later be
 * loaded from the backend. Keeps sections visually complete without
 * fabricating information.
 */
export function EmptyState({
  title,
  description,
  className,
  icon,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-lg border border-dashed border-border bg-card/40 px-6 py-14 text-center",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="flex size-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground"
      >
        {icon ?? <Construction className="size-5" strokeWidth={1.75} />}
      </span>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-h3">{title}</h3>
        {description ? (
          <p className="mx-auto max-w-md text-small text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
