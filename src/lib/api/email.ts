import { normalizeEmail } from '../helpers/email';
import { Email } from '../types/types';
import { api, ApiResponse } from './api';

export async function apiSendEmail(data: Email): Promise<ApiResponse<void>> {
  return api<void>('POST', '/email/send', {
    ...data,
    to: data.to.map(normalizeEmail),
  });
}
