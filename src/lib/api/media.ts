'use server';

import { api, ApiResponse } from './api';

/* Presigned URLs for files in the nusci-media S3 bucket */

export type MediaFolder = 'archive' | 'images';

export type UploadUrlRequest = {
  folder: MediaFolder;
  contentType: string;
  size: number; // bytes
};

export type UploadUrlResponse = {
  key: string;
  uploadUrl: string;
  contentType: string;
  expiresIn: number;
};

export type DownloadUrlResponse = {
  url: string; // presigned, expires
  expiresIn: number; // seconds
};

export async function apiGetUploadUrl(
  request: UploadUrlRequest,
): Promise<ApiResponse<UploadUrlResponse>> {
  return api<UploadUrlResponse>('POST', '/media/upload-url', request);
}

/** Only works for keys in the images folder, archive files go through /archive */
export async function apiGetDownloadUrl(
  key: string,
): Promise<ApiResponse<DownloadUrlResponse>> {
  return api<DownloadUrlResponse>(
    'GET',
    `/media/download-url?key=${encodeURIComponent(key)}`,
  );
}
