"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/#about", label: "about" },
  { href: "/#work", label: "work" },
  { href: "/#experience", label: "experience" },
  { href: "/#skills", label: "skills" },
  { href: "/#contact", label: "contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        (scrolled || open) && "border-b border-border bg-bg/85 backdrop-blur-sm"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-content items-center justify-between px-5 font-mono sm:px-6 md:px-8"
      >
        <Link
          href="/"
          className="rounded text-sm font-medium tracking-tight text-fg transition-colors hover:text-accent"
        >
          {siteConfig.wordmark}
        </Link>

        <div className="flex items-center gap-4 sm:gap-5">
          <ul className="hidden items-center gap-5 text-sm md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded text-muted transition-colors hover:text-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <span
            className="hidden h-4 w-px bg-border md:block"
            aria-hidden="true"
          />
          <ThemeToggle />

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="rounded font-mono text-sm text-muted transition-colors hover:text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "close" : "menu"}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <ul
        id="mobile-menu"
        hidden={!open}
        className="border-t border-border bg-bg/95 px-5 py-2 font-mono text-sm backdrop-blur-sm sm:px-6 md:hidden"
      >
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded py-2.5 text-muted transition-colors hover:text-accent"
            >
              <span className="text-accent" aria-hidden="true">
                /{" "}
              </span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
