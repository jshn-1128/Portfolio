import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** hover lift + border emphasis for interactive cards */
  interactive?: boolean;
}

export function Card({ children, className, interactive }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card text-card-foreground",
        interactive &&
          "transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_12px_32px_-16px_var(--glow)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
