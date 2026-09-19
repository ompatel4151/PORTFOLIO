"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Wraps next-themes. We use the `.light` class (dark is the default on :root),
 * so the provider toggles a class on <html> and we disable the OS-driven
 * default to keep dark as the deliberate baseline.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
