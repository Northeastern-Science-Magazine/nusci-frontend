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
