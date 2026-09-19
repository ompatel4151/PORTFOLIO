import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/content";

export function Contact() {
  const { contact } = siteConfig;

  return (
    <Section id="contact" label="contact">
      <div className="grid gap-10 md:grid-cols-5 md:gap-14">
        <Reveal className="md:col-span-3">
          <h3 className="max-w-md font-mono text-2xl font-medium leading-snug tracking-tight md:text-3xl">
            {contact.heading}
          </h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            {contact.blurb}
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="mt-8 inline-flex items-center gap-2 border border-accent bg-accent/10 px-5 py-2.5 font-mono text-sm text-accent transition-colors hover:bg-accent hover:text-bg"
          >
            <span aria-hidden="true">→</span>
            say hello
          </a>
        </Reveal>

        <Reveal className="md:col-span-2" delay={0.1}>
          <ul className="border-t border-border">
            {contact.channels.map((c) => (
              <li key={c.note}>
                <a
                  href={c.href}
                  className="group flex items-center justify-between gap-4 border-b border-border py-3 font-mono transition-colors hover:bg-surface/50"
                >
                  <span className="text-sm text-fg/90 transition-colors group-hover:text-accent">
                    {c.label}
                  </span>
                  <span className="text-xs text-muted">{c.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
