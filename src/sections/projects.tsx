import Link from "next/link";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/projects";

const MAX_TAGS = 4;

export function Projects() {
  return (
    <Section id="work" label="selected work">
      <div className="border-t border-border">
        {projects.map((project, i) => {
          const shown = project.techStack.slice(0, MAX_TAGS);
          const extra = project.techStack.length - shown.length;

          return (
            <Reveal key={project.slug} delay={i * 0.05}>
              <Link
                href={`/projects/${project.slug}`}
                className="group grid grid-cols-[1fr_auto] items-baseline gap-x-5 gap-y-2 border-b border-border py-6 transition-colors hover:bg-surface/50 md:grid-cols-[1fr_auto_1.5rem] md:gap-x-6"
              >
                <div className="col-start-1 row-start-1">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="font-mono text-lg font-medium tracking-tight transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="font-mono text-xs text-accent">
                        ★ featured
                      </span>
                    )}
                  </div>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
                    {project.tagline}
                  </p>
                </div>

                <span className="col-start-1 row-start-2 font-mono text-xs text-muted md:col-start-2 md:row-start-1 md:max-w-[16rem] md:text-right">
                  {shown.join(" · ")}
                  {extra > 0 && ` · +${extra}`}
                </span>

                <span
                  aria-hidden="true"
                  className="col-start-2 row-start-1 justify-self-end font-mono text-muted transition-all group-hover:translate-x-0.5 group-hover:text-accent md:col-start-3"
                >
                  →
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
