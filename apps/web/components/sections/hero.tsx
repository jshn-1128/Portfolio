"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { AVAILABILITY, HERO, SOCIAL_LINKS } from "@/lib/site";

export function Hero() {
  return (
    <section id="home" aria-label="Introduction" className="relative">
      <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[28rem]" />
      <Container className="relative flex min-h-svh flex-col justify-center py-32">
        <motion.div
          data-animate-reveal="true"
          className="flex max-w-3xl flex-col items-start gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {AVAILABILITY.label}
            </span>
          </motion.div>

          <motion.p variants={fadeUp} className="text-code text-primary">
            <span aria-hidden="true">{"// "}</span>
            {HERO.eyebrow}
          </motion.p>

          <motion.h1 variants={fadeUp} className="text-display">
            {HERO.headlineTop}
            <br />
            <span className="gradient-text">{HERO.headlineBottom}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-body text-muted-foreground"
          >
            {HERO.intro}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-2 flex flex-wrap items-center gap-3"
          >
            <Button href={HERO.primaryCta.href} size="lg">
              {HERO.primaryCta.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button
              href={HERO.secondaryCta.href}
              size="lg"
              variant="secondary"
            >
              {HERO.secondaryCta.label}
            </Button>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2"
            aria-label="Social links"
          >
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={`${social.label}${social.placeholder ? " (coming soon)" : ""}`}
                  className="text-code text-muted-foreground underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-foreground hover:decoration-primary focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4"
                >
                  {social.label.toLowerCase()}
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>
    </section>
  );
}
