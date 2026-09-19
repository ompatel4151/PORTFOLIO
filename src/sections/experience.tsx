import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/content";

export function Experience() {
  return (
    <Section id="experience" label="experience">
      <div>
        {siteConfig.experience.map((role, i) => (
          <Reveal key={`${role.company}-${i}`} delay={i * 0.05}>
            <div className="grid grid-cols-[1rem_1fr] gap-x-5 pb-12 last:pb-0 md:gap-x-8">
              {/* Timeline rail + node. Each entry draws a full-height rail
                  segment so the line stays continuous across the gap. */}
              <div className="relative flex justify-center">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border"
                />
                <span
                  aria-hidden="true"
                  className="relative mt-1.5 h-2.5 w-2.5 bg-accent ring-4 ring-bg"
                />
              </div>

              <div>
                <p className="font-mono text-xs text-muted">{role.period}</p>
                <h3 className="mt-2 font-mono text-base font-medium tracking-tight">
                  {role.title}
                  <span className="text-accent"> @ {role.company}</span>
                </h3>
                <p className="mt-1 font-mono text-xs text-muted">
                  {role.location}
                </p>

                <ul className="mt-4 space-y-3">
                  {role.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1 font-mono text-sm text-accent"
                      >
                        →
                      </span>
                      <span className="max-w-2xl text-sm leading-relaxed text-muted">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
