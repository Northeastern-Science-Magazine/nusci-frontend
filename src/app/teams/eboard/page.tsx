import { eboard, editors } from './members';
import EboardTabs from './EboardTabs';
import { publicProfileExists } from '@/lib/api/profiles';

export default async function EboardPage() {
  // Only link cards to profiles that exist, so a member who hasn't signed
  // up yet (or a mistyped email) doesn't lead to a 404.
  const emails = Array.from(
    new Set([...eboard, ...editors].map((member) => member.email)),
  );
  const exists = await Promise.all(emails.map(publicProfileExists));
  const linkedEmails = emails.filter((_, i) => exists[i]);

  return (
    <EboardTabs eboard={eboard} editors={editors} linkedEmails={linkedEmails} />
  );
}
