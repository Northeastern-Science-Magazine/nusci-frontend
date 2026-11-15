'use client';

import { useState, type FormEvent } from 'react';
import { updatePitchRecipients, type PitchRecipient } from '@/lib/api/pitch';

type Props = {
  recipients: PitchRecipient[];
  initialRecipientIds: string[];
};

export default function PitchRecipientForm({
  recipients,
  initialRecipientIds,
}: Props) {
  const eligibleIds = new Set(recipients.map((user) => user._id));

  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    initialRecipientIds.filter((id) => eligibleIds.has(id)),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function toggleRecipient(id: string) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id],
    );

    setError('');
    setSuccess('');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (selectedIds.length === 0) {
      setError('Please select at least one recipient.');
      return;
    }

    setIsSaving(true);

    try {
      const response = await updatePitchRecipients(selectedIds);

      if (!response.ok) {
        setError(response.error);
        return;
      }

      setSelectedIds(response.recipientIds);
      setSuccess('Pitch recipients saved.');
    } catch {
      setError('Unable to save recipients. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }

  if (recipients.length === 0) {
    return (
      <p className="mt-8 text-gray-600">
        No eligible admins were found. Recipients must have the admin role and a
        graduation year of this year or later.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <fieldset disabled={isSaving}>
        <legend className="mb-4 font-medium">Eligible recipients</legend>

        <div className="space-y-3">
          {recipients.map((recipient) => (
            <label
              key={recipient._id}
              className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-300 p-4"
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(recipient._id)}
                onChange={() => toggleRecipient(recipient._id)}
                className="mt-1 h-4 w-4 accent-[#800020]"
              />

              <span className="min-w-0">
                <span className="block font-medium">
                  {recipient.firstName} {recipient.lastName}
                </span>
                <span className="block break-all text-sm text-gray-600">
                  {recipient.email}
                </span>
              </span>
            </label>
          ))}
        </div>

        <button
          type="submit"
          disabled={selectedIds.length === 0}
          className="mt-6 rounded-lg bg-[#800020] px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? 'Saving…' : 'Save recipients'}
        </button>
      </fieldset>

      {error && (
        <p role="alert" className="mt-4 text-red-700">
          {error}
        </p>
      )}

      {success && (
        <p role="status" className="mt-4 text-green-700">
          {success}
        </p>
      )}
    </form>
  );
}
