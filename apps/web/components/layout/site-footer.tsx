import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SITE, SOCIAL_LINKS } from "@/lib/site";

const CURRENT_YEAR = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold tracking-tight">{SITE.name}</p>
          <p className="max-w-xs text-small text-muted-foreground">
            {SITE.description}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2">
          <p className="text-label text-muted-foreground">Navigate</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/#about"
              className="text-small text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/#projects"
              className="text-small text-muted-foreground transition-colors hover:text-foreground"
            >
              Projects
            </Link>
            <Link
              href="/#contact"
              className="text-small text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="text-small text-muted-foreground transition-colors hover:text-foreground"
            >
              Blog
            </Link>
          </div>
        </nav>

        <div className="flex flex-col gap-2">
          <p className="text-label text-muted-foreground">Find me</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-small text-muted-foreground transition-colors hover:text-foreground"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex items-center justify-between py-5">
          <p className="text-small text-muted-foreground">
            © {CURRENT_YEAR} {SITE.name}
          </p>
          <p className="text-code text-muted-foreground">
            <span aria-hidden="true">{"</>"}</span> built with Next.js
          </p>
        </Container>
      </div>
    </footer>
  );
}
