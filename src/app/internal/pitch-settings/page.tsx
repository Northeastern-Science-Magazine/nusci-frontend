import Link from 'next/link';
import { notFound } from 'next/navigation';
import { apiGetMyProfile } from '@/lib/api/users';
import { getPitchSettings } from '@/lib/api/pitch';
import { Roles } from '@/lib/types/types';
import PitchRecipientForm from './PitchRecipientForm';

export default async function PitchSettingsPage() {
  const profile = await apiGetMyProfile();

  if (!profile.ok || !profile.data.roles.includes(Roles.Admin)) {
    notFound();
  }

  const settings = await getPitchSettings();

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <Link
        href={`/internal/dashboard/${profile.data.email.split('@')[0]}`}
        className="text-sm text-[#800020] underline"
      >
        Back to dashboard
      </Link>

      <h1 className="mt-6 text-3xl font-semibold">Article pitch recipients</h1>

      <p className="mt-3 text-gray-600">
        Choose who receives article pitches submitted through the website.
        Select at least one recipient.
      </p>

      {settings.ok ? (
        <PitchRecipientForm
          recipients={settings.eligibleRecipients}
          initialRecipientIds={settings.recipientIds}
        />
      ) : (
        <p role="alert" className="mt-6 text-red-700">
          Unable to load pitch settings: {settings.error}
        </p>
      )}
    </main>
  );
}
