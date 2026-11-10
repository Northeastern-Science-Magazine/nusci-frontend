const NORTHEASTERN_SUFFIX = '@northeastern.edu';

/**
 * Path of an author's public profile, e.g. /profile/jdoe for
 * jdoe@northeastern.edu. Profiles are keyed by the part of the email before
 * @northeastern.edu, so other addresses have no profile page (undefined).
 */
export function profileHref(email: string | undefined): string | undefined {
  if (!email) return undefined;
  const normalized = email.replace(/\s+/g, '').toLowerCase();
  if (!normalized.endsWith(NORTHEASTERN_SUFFIX)) return undefined;
  const prefix = normalized.slice(0, -NORTHEASTERN_SUFFIX.length);
  return prefix ? `/profile/${encodeURIComponent(prefix)}` : undefined;
}
