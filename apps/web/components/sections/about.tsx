import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ABOUT } from "@/lib/site";

export function AboutSection() {
  return (
    <Section id="about" labelledBy="about-heading">
      <Reveal className="grid gap-10 md:grid-cols-[1fr_1.5fr]">
        <SectionHeading
          eyebrow="01 · About"
          title={ABOUT.heading}
          className="md:sticky md:top-24 md:self-start"
        />
        <div className="flex flex-col gap-5">
          {ABOUT.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-xl text-body text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
