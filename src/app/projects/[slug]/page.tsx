import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProject,
  getProjectNavigation,
  projects,
} from "@/lib/projects";
import { siteConfig } from "@/lib/content";

/** True when a cover file actually exists under /public (checked at build). */
function coverExists(coverImage: string | null): boolean {
  if (!coverImage) return false;
  return fs.existsSync(path.join(process.cwd(), "public", coverImage));
}

interface PageProps {
  params: { slug: string };
}

// Statically generate a page per project at build time.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project not found" };

  const canonical = `/projects/${project.slug}`;
  const ogImage = project.coverImage
    ? `${siteConfig.url}${project.coverImage}`
    : undefined;
  const images = ogImage
    ? [{ url: ogImage, alt: `${project.title} — screenshot` }]
    : undefined;

  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}${canonical}`,
      title: `${project.title} — ${siteConfig.name}`,
      description: project.tagline,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${siteConfig.name}`,
      description: project.tagline,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const nav = getProjectNavigation(params.slug);
  const hasCover = coverExists(project.coverImage);

  const links = [
    project.githubUrl && { key: "github", href: project.githubUrl },
    project.liveUrl && { key: "live demo", href: project.liveUrl },
  ].filter(Boolean) as { key: string; href: string }[];

  return (
    <article className="mx-auto max-w-content px-6 py-20 md:px-8 md:py-28">
      <Link
        href="/#work"
        className="group inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-accent"
      >
        <span
          aria-hidden="true"
          className="transition-transform group-hover:-translate-x-0.5"
        >
          ←
        </span>
        back to work
      </Link>

      <header className="mt-10 max-w-3xl border-b border-border pb-8">
        <p className="font-mono text-sm text-accent">
          {project.featured ? "// featured project" : "// project"}
          {project.role && (
            <span className="text-muted"> · {project.role}</span>
          )}
        </p>
        <h1 className="mt-4 text-balance font-mono text-3xl font-semibold tracking-tight md:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {project.tagline}
        </p>
      </header>

      {hasCover && project.coverImage ? (
        /* Real screenshot: optimized via next/image. */
        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden border border-border bg-surface">
          <Image
            src={project.coverImage}
            alt={`${project.title} — screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 1024px"
            className="object-cover"
            priority
          />
        </div>
      ) : project.coverImage ? (
        /* Cover slot awaiting a screenshot at public{coverImage}. */
        <div className="mt-10 aspect-[16/9] w-full overflow-hidden border border-dashed border-border bg-surface">
          <div className="grid h-full place-items-center">
            <span className="font-mono text-xs text-muted">
              {project.coverImage} — add screenshot
            </span>
          </div>
        </div>
      ) : project.stats && project.stats.length > 0 ? (
        /* Backend/CLI projects: a mono metric block in place of a screenshot. */
        <div className="mt-10 border border-border bg-surface/40 p-6 md:p-8">
          <h2 className="marker mb-5">{"// by the numbers"}</h2>
          <ul className="grid gap-x-8 gap-y-3 font-mono text-sm sm:grid-cols-2">
            {project.stats.map((stat) => (
              <li key={stat} className="flex items-baseline gap-2 text-fg/90">
                <span aria-hidden="true" className="text-accent">
                  ▪
                </span>
                {stat}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-12 grid gap-12 md:grid-cols-[1fr_16rem]">
        <div className="max-w-2xl space-y-12">
          <section>
            <h2 className="marker mb-4">{"// overview"}</h2>
            <p className="text-base leading-relaxed text-muted">
              {project.description}
            </p>
          </section>

          <section>
            <h2 className="marker mb-4">{"// the problem"}</h2>
            <p className="text-base leading-relaxed text-muted">
              {project.problem}
            </p>
          </section>

          <section>
            <h2 className="marker mb-4">{"// engineering decisions"}</h2>
            <p className="text-base leading-relaxed text-muted">
              {project.decisions}
            </p>
          </section>

          <section>
            <h2 className="marker mb-4">{"// highlights"}</h2>
            <ul className="space-y-4">
              {project.highlights.map((point, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1 font-mono text-sm text-accent"
                  >
                    →
                  </span>
                  <span className="text-sm leading-relaxed text-muted">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-8 md:sticky md:top-24 md:self-start">
          <div>
            <h2 className="marker mb-3">{"// stack"}</h2>
            <ul className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li
                  key={tech}
                  className="border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="marker mb-3">{"// links"}</h2>
            {links.length > 0 ? (
              <ul className="space-y-2 font-mono text-sm">
                {links.map((link) => (
                  <li key={link.key}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${link.key} (opens in a new tab)`}
                      className="inline-flex items-center gap-1 rounded text-fg/90 transition-colors hover:text-accent"
                    >
                      {link.key}{" "}
                      <span aria-hidden="true" className="text-accent">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-mono text-xs text-muted">coming soon</p>
            )}
          </div>
        </aside>
      </div>

      {nav && (
        <nav
          aria-label="Project navigation"
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border"
        >
          <Link
            href={`/projects/${nav.prev.slug}`}
            className="group flex flex-col gap-1 bg-bg p-6 transition-colors hover:bg-surface"
          >
            <span className="font-mono text-xs text-muted">
              <span
                aria-hidden="true"
                className="inline-block text-accent transition-transform group-hover:-translate-x-0.5"
              >
                ←
              </span>{" "}
              previous
            </span>
            <span className="font-mono text-sm font-medium tracking-tight transition-colors group-hover:text-accent">
              {nav.prev.title}
            </span>
          </Link>

          <Link
            href={`/projects/${nav.next.slug}`}
            className="group flex flex-col items-end gap-1 bg-bg p-6 text-right transition-colors hover:bg-surface"
          >
            <span className="font-mono text-xs text-muted">
              next{" "}
              <span
                aria-hidden="true"
                className="inline-block text-accent transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </span>
            <span className="font-mono text-sm font-medium tracking-tight transition-colors group-hover:text-accent">
              {nav.next.title}
            </span>
          </Link>
        </nav>
      )}
    </article>
  );
}
