import { apiGetUploadUrl, MediaFolder } from '@/lib/api/archive';

/**
 * Uploads a file straight from the browser to S3.
 * Asks the backend for a presigned URL, then PUTs the file to it,
 * so the file never passes through our servers.
 *
 * Client-side only.
 *
 * @param folder media folder the file belongs in
 * @param file the file to upload
 * @param onProgress called with the fraction uploaded, 0 to 1
 * @returns the file's S3 key, to save on the related document
 */
export async function uploadToS3(
  folder: MediaFolder,
  file: File,
  onProgress?: (fraction: number) => void,
): Promise<string> {
  const response = await apiGetUploadUrl({
    folder,
    contentType: file.type,
    size: file.size,
  });
  if (!response.ok) {
    throw new Error(response.error);
  }

  const { uploadUrl, key, contentType } = response.data;

  // XHR rather than fetch so we can report upload progress
  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', uploadUrl);
    // must match the content type the URL was signed with
    xhr.setRequestHeader('Content-Type', contentType);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress?.(event.loaded / event.total);
    };
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? resolve()
        : reject(new Error(`Upload failed with status ${xhr.status}`));
    xhr.onerror = () => reject(new Error('Upload failed: network error'));
    xhr.send(file);
  });

  return key;
}
