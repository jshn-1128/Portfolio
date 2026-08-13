import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "accent" | "outline" | "success";
  className?: string;
}

const badgeVariants = {
  default: "bg-secondary text-secondary-foreground border-border",
  accent: "bg-accent/10 text-accent border-accent/25",
  outline: "bg-transparent text-muted-foreground border-border",
  success: "bg-accent/10 text-accent border-accent/25",
} as const;

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        badgeVariants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
