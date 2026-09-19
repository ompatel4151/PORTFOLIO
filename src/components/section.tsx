import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  /** Lowercase label rendered as a "// label" comment marker. */
  label: string;
  children: ReactNode;
  className?: string;
}

/**
 * Shared section shell. Header reads like a source-comment ("// selected work")
 * over a hairline rule — a marker that's meaningful in the terminal identity
 * rather than a decorative section number.
 */
export function Section({ id, label, children, className }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("scroll-mt-20 py-20 md:py-28", className)}
    >
      <div className="mx-auto max-w-content px-6 md:px-8">
        <Reveal>
          <div className="mb-12 flex items-baseline gap-3 border-b border-border pb-3">
            <span className="font-mono text-sm text-accent" aria-hidden="true">
              {"//"}
            </span>
            <h2
              id={headingId}
              className="font-mono text-sm font-medium tracking-wide text-fg"
            >
              {label}
            </h2>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
