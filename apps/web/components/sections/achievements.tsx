import { Award } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SECTION_COPY } from "@/lib/site";

export function AchievementsSection() {
  return (
    <Section id="achievements" labelledBy="achievements-heading">
      <div className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="05 · Achievements"
          title={SECTION_COPY.achievements.heading}
          description={SECTION_COPY.achievements.description}
        />
        <Reveal>
          <EmptyState
            icon={<Award className="size-5" strokeWidth={1.75} />}
            title="Milestones will appear here"
            description="Academic results, competitions, and milestones — recorded as they're earned."
          />
        </Reveal>
      </div>
    </Section>
  );
}
