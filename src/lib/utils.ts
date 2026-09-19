/**
 * Tiny classname joiner. Filters falsy values so conditional classes stay
 * readable at call sites: cn("base", active && "active").
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
