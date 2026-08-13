import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing about computer science, AI, and software engineering. Posts coming soon.",
};

export default function BlogPage() {
  return (
    <Section labelledBy="blog-heading" className="min-h-svh pt-32 sm:pt-40">
      <div className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Blog"
          title="Notes on CS & AI"
          description="Long-form writing on artificial intelligence, machine learning, and software engineering. First post is in progress."
        />
        <EmptyState
          icon={<BookOpen className="size-5" strokeWidth={1.75} />}
          title="No posts yet"
          description="Articles will be published here. Check back soon."
        />
      </div>
    </Section>
  );
}
