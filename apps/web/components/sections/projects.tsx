import { FolderGit2 } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SECTION_COPY } from "@/lib/site";

export function ProjectsSection() {
  return (
    <Section id="projects" labelledBy="projects-heading">
      <div className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="03 · Projects"
          title={SECTION_COPY.projects.heading}
          description={SECTION_COPY.projects.description}
        />
        <Reveal>
          <EmptyState
            icon={<FolderGit2 className="size-5" strokeWidth={1.75} />}
            title="Featured projects coming soon"
            description="Selected work with context, tech stack, and links will be showcased here."
          />
        </Reveal>
      </div>
    </Section>
  );
}
