"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/content";

export function Hero() {
  const reduce = useReducedMotion();
  const { name, hero } = siteConfig;

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-content px-6 pb-16 pt-20 md:px-8 md:pb-24 md:pt-32">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.07, delayChildren: 0.05 }}
        >
          <motion.p
            variants={item}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-sm text-accent"
          >
            {hero.availability}
          </motion.p>

          <motion.h1
            variants={item}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 font-mono text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl"
          >
            {name}
            <span
              aria-hidden="true"
              className="ml-1 inline-block w-[0.55ch] animate-pulse text-accent"
            >
              _
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          >
            {hero.intro}
          </motion.p>

          <motion.div
            variants={item}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-sm"
          >
            {hero.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group inline-flex items-center gap-1.5 rounded text-muted transition-colors hover:text-accent"
              >
                <span
                  aria-hidden="true"
                  className="text-accent/70 group-hover:text-accent"
                >
                  →
                </span>
                {link.label}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
