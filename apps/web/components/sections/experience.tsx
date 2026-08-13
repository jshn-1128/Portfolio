import { Briefcase } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SECTION_COPY } from "@/lib/site";

export function ExperienceSection() {
  return (
    <Section id="experience" labelledBy="experience-heading">
      <div className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="04 · Experience"
          title={SECTION_COPY.experience.heading}
          description={SECTION_COPY.experience.description}
        />
        <Reveal>
          <EmptyState
            icon={<Briefcase className="size-5" strokeWidth={1.75} />}
            title="Experience timeline coming soon"
            description="Education, internships, and roles will be documented here as they happen."
          />
        </Reveal>
      </div>
    </Section>
  );
}
