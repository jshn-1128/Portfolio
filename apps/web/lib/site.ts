/**
 * Central site configuration and placeholder content.
 *
 * All user-facing copy lives here so the homepage can later be wired to a
 * backend without touching component layout. Placeholder values are clearly
 * marked with `PLACEHOLDER` — they must not be treated as real information.
 */

export const SITE = {
  name: "Jashanpreet Singh",
  monogram: "JS",
  /** PLACEHOLDER: site URL — replace before production */
  url: "https://jashanpreet.dev",
  /** PLACEHOLDER: short, neutral tagline. Not a professional title. */
  description:
    "Personal portfolio of Jashanpreet Singh — a Computer Science student focused on AI and software engineering.",
} as const;

export interface NavLink {
  label: string;
  href: string;
  /** section id on the homepage (for scroll-spy); undefined for pages */
  sectionId?: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/#home", sectionId: "home" },
  { label: "About", href: "/#about", sectionId: "about" },
  { label: "Projects", href: "/#projects", sectionId: "projects" },
  { label: "Experience", href: "/#experience", sectionId: "experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];

export interface SocialLink {
  label: string;
  href: string;
  /** PLACEHOLDER: true until a real URL is provided */
  placeholder?: boolean;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "#", placeholder: true },
  { label: "LinkedIn", href: "#", placeholder: true },
  { label: "X / Twitter", href: "#", placeholder: true },
  { label: "Email", href: "#", placeholder: true },
];

/** PLACEHOLDER: availability line shown in the hero status pill */
export const AVAILABILITY = {
  label: "Available for opportunities",
  detail: "Open to internships and collaborations",
} as const;

/** PLACEHOLDER: hero copy — neutral, no fabricated claims */
export const HERO = {
  eyebrow: "Computer Science · AI",
  headlineTop: "Building software",
  headlineBottom: "at the intersection of AI",
  intro:
    "I'm Jashanpreet Singh — a Computer Science student exploring artificial intelligence, machine learning, and modern software engineering. This site is under construction while I document my work and journey.",
  primaryCta: { label: "View my projects", href: "/#projects" },
  secondaryCta: { label: "Get in touch", href: "/#contact" },
} as const;

/** PLACEHOLDER: about copy — neutral, will be replaced with real bio */
export const ABOUT = {
  heading: "About me",
  paragraphs: [
    "A Computer Science student with a strong interest in artificial intelligence, machine learning, and building thoughtful software. This section will contain a proper introduction.",
    "Placeholder bio — to be replaced with real background, interests, and goals.",
  ],
} as const;

export const SECTION_COPY = {
  skills: {
    heading: "Skills",
    description:
      "The technologies and tools I work with will be listed here once confirmed.",
  },
  projects: {
    heading: "Featured projects",
    description:
      "Selected work will be showcased here — each project with context, technologies, and links.",
  },
  experience: {
    heading: "Experience",
    description:
      "Education, internships, and roles will be documented here as they happen.",
  },
  achievements: {
    heading: "Achievements",
    description:
      "Academic results, competitions, and milestones will appear here in time.",
  },
  contact: {
    heading: "Get in touch",
    description:
      "Whether it's a project idea, an opportunity, or a conversation about AI — my inbox is open.",
    cta: { label: "Say hello", href: "mailto:hello@example.com" },
  },
} as const;
