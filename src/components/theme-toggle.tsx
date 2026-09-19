"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Monospace text toggle in keeping with the terminal identity. Shows the mode
 * you'd switch *to*. Renders a stable placeholder until mounted to avoid a
 * hydration mismatch (the server can't know the resolved theme).
 */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const next = isDark ? "light" : "dark";
  const current = mounted ? (isDark ? "dark" : "light") : "····";

  return (
    <button
      type="button"
      // Accessible name begins with the visible text ("theme: dark") to satisfy
      // WCAG "Label in Name", then adds the action for screen-reader context.
      aria-label={mounted ? `theme: ${current}, switch to ${next}` : "Toggle theme"}
      onClick={() => setTheme(next)}
      className="group rounded font-mono text-xs text-muted transition-colors hover:text-fg"
    >
      <span className="text-accent">theme:</span>{" "}
      <span className="tabular-nums">{current}</span>
    </button>
  );
}
