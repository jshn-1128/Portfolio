import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SECTION_COPY } from "@/lib/site";

export function ContactSection() {
  return (
    <Section id="contact" labelledBy="contact-heading" className="pb-24 sm:pb-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-10 text-center sm:p-16">
          <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-40" />
          <div className="relative flex flex-col items-center gap-6">
            <SectionHeading
              align="center"
              eyebrow="06 · Contact"
              title={SECTION_COPY.contact.heading}
              description={SECTION_COPY.contact.description}
            />
            <Button href={SECTION_COPY.contact.cta.href} size="lg">
              {SECTION_COPY.contact.cta.label}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
