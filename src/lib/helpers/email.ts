/**
 * Normalizes an email address typed by a user: strips all whitespace
 * (including stray spaces inside a pasted address) and lowercases it.
 */
export function normalizeEmail(email: string): string {
  return email.replace(/\s+/g, '').toLowerCase();
}
