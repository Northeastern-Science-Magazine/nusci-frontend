'use server';

import { api } from './api';

export type PitchSubmission = {
  name: string;
  email: string;
  topic: string;
  draftUrl?: string;
};

export async function submitPitch(pitch: PitchSubmission) {
  const response = await api<{ message: string }>('POST', '/pitch', pitch);

  if (!response.ok) {
    return { ok: false as const, error: response.error };
  }

  return { ok: true as const, message: response.data.message };
}

export type PitchRecipient = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export async function getPitchSettings() {
  const response = await api<{
    eligibleRecipients: PitchRecipient[];
    recipientIds: string[];
  }>('GET', '/pitch/settings');

  if (!response.ok) {
    return { ok: false as const, error: response.error };
  }

  return { ok: true as const, ...response.data };
}

export async function updatePitchRecipients(recipientIds: string[]) {
  const response = await api<{ recipientIds: string[] }>(
    'PATCH',
    '/pitch/settings',
    { recipientIds },
  );

  if (!response.ok) {
    return { ok: false as const, error: response.error };
  }

  return { ok: true as const, recipientIds: response.data.recipientIds };
}
