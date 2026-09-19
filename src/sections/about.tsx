import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/content";

export function About() {
  const { paragraphs, education } = siteConfig.about;

  return (
    <Section id="about" label="about">
      <div className="grid gap-12 md:grid-cols-5 md:gap-14">
        <Reveal className="md:col-span-3" delay={0.05}>
          <div className="max-w-2xl space-y-4 text-base leading-relaxed text-muted">
            {paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal className="md:col-span-2" delay={0.12}>
          <div className="border-t border-border pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <h3 className="marker mb-5">{"// education"}</h3>
            <ul className="space-y-6">
              {education.map((e) => (
                <li key={e.school}>
                  <p className="font-mono text-xs text-muted">{e.period}</p>
                  <p className="mt-1.5 font-mono text-sm leading-snug tracking-tight">
                    {e.degree && (
                      <span className="text-fg">{e.degree} · </span>
                    )}
                    {e.school}
                  </p>
                  {e.note && (
                    <p className="mt-1 font-mono text-xs text-accent">
                      {e.note}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
