import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/85 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_14px_-4px_var(--glow)]",
  secondary:
    "border border-border bg-secondary/40 text-foreground hover:bg-secondary hover:border-border",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-subtle",
} as const;

const buttonSizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-base",
} as const;

type ButtonVariant = keyof typeof buttonVariants;
type ButtonSize = keyof typeof buttonSizes;

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  external?: boolean;
  "aria-label"?: string;
}

function buttonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
    "transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-3",
    buttonVariants[variant],
    buttonSizes[size],
    className,
  );
}

/**
 * Link-styled button. Works with internal routes, hash anchors, and
 * external protocols (e.g. mailto:) through Next's Link component.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = buttonClasses(variant, size, className);
  const commonProps = {
    className: classes,
    "aria-label": ariaLabel,
  };

  if (external) {
    return (
      <a
        {...commonProps}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...commonProps}>
      {children}
    </Link>
  );
}
