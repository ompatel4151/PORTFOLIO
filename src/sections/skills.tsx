import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/content";

export function Skills() {
  return (
    <Section id="skills" label="skills">
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {siteConfig.skills.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.05}>
            <div className="border-t border-border pt-4">
              <h3 className="marker mb-4">{`// ${group.label}`}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border border-border bg-surface/40 px-2.5 py-1 font-mono text-sm text-fg/90 transition-colors hover:border-accent hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
