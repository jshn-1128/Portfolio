import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  /** visual role for screen readers and semantics */
  labelledBy?: string;
}

export function Section({
  id,
  children,
  className,
  containerClassName,
  labelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("scroll-mt-24 py-20 sm:py-28", className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
