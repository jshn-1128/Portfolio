"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { NAV_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const SECTION_IDS = NAV_LINKS.flatMap((link) =>
  link.sectionId ? [link.sectionId] : [],
);

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeId = useScrollSpy(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled || mobileOpen
          ? "glass border-border"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-md text-sm font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4"
        >
          <span
            aria-hidden="true"
            className="flex size-8 items-center justify-center rounded-md border border-border bg-secondary font-mono text-xs text-primary"
          >
            {SITE.monogram}
          </span>
          {SITE.name}
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.sectionId !== undefined &&
              isHome &&
              activeId === link.sectionId;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "bg-subtle text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md border border-border bg-card/50 text-foreground md:hidden focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            className="glass overflow-hidden border-b border-border md:hidden"
            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.sectionId !== undefined &&
                  isHome &&
                  activeId === link.sectionId;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "block rounded-md px-3 py-2.5 text-base font-medium transition-colors duration-200",
                        isActive
                          ? "bg-subtle text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
