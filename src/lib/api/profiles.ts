import { emailFromProfileParam, profilePath } from '@/lib/helpers/profile';

// How long a profile check is cached, so a new signup's card starts
// linking within this many seconds without a check on every page view.
const PROFILE_CHECK_SECONDS = 600;

/**
 * Whether profilePath(email) leads to a public profile, rather than a 404.
 * Checks the same email the profile page will look up. Server only.
 *
 * @param email the member's email, possibly blank
 */
export async function publicProfileExists(email: string): Promise<boolean> {
  const path = profilePath(email);
  if (!path) {
    return false;
  }

  const lookupEmail = emailFromProfileParam(path.split('/').pop() ?? '');
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/email/${encodeURIComponent(lookupEmail)}`,
      { next: { revalidate: PROFILE_CHECK_SECONDS } },
    );
    return res.ok;
  } catch {
    // Backend unreachable: leave the card unlinked rather than break the page.
    return false;
  }
}
