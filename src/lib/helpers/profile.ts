const SCHOOL_DOMAIN = '@northeastern.edu';

/**
 * Link to someone's public profile page (src/app/profile/[emailPrefix]).
 * Northeastern addresses use just the part before the @, anything else
 * uses the whole (encoded) address. Returns undefined for an address
 * with nothing before or after the @, since it can't belong to anyone.
 *
 * @param email the user's email
 */
export function profilePath(email: string | undefined): string | undefined {
  const trimmed = email?.trim() ?? '';
  const at = trimmed.indexOf('@');
  if (at <= 0 || at === trimmed.length - 1) {
    return undefined;
  }

  if (trimmed.toLowerCase().endsWith(SCHOOL_DOMAIN)) {
    return `/profile/${encodeURIComponent(trimmed.slice(0, at))}`;
  }
  return `/profile/${encodeURIComponent(trimmed)}`;
}

/**
 * Turns the [emailPrefix] route param back into a full email,
 * undoing profilePath.
 *
 * @param emailPrefix the route param, a Northeastern prefix or a whole email
 */
export function emailFromProfileParam(emailPrefix: string): string {
  let decoded = emailPrefix;
  try {
    decoded = decodeURIComponent(emailPrefix);
  } catch {
    // Malformed escapes are left as they are, and won't match a user.
  }
  return decoded.includes('@') ? decoded : `${decoded}${SCHOOL_DOMAIN}`;
}
