import { Blocks } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SECTION_COPY } from "@/lib/site";

export function SkillsSection() {
  return (
    <Section id="skills" labelledBy="skills-heading">
      <div className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="02 · Skills"
          title={SECTION_COPY.skills.heading}
          description={SECTION_COPY.skills.description}
        />
        <Reveal>
          <EmptyState
            icon={<Blocks className="size-5" strokeWidth={1.75} />}
            title="Skill groups will appear here"
            description="Programming languages, frameworks, AI/ML tools, and workflows — organized by category once confirmed."
          />
        </Reveal>
      </div>
    </Section>
  );
}
