/**
 * Lightweight className combinator. No dependency on clsx/tailwind-merge —
 * Tailwind 4 conflict resolution is rare in our codebase and we keep deps minimal.
 */
export function cn(...inputs: Array<string | number | boolean | null | undefined>): string {
  return inputs.filter(Boolean).join(' ');
}
