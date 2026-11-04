/** Content types the backend accepts in the images folder */
export const IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

const MEDIA_PATH_PREFIX = '/media/';

/**
 * Stable link to an uploaded image, served by src/app/media/[...key]/route.ts.
 * This is what gets saved on documents (article image content, profile and
 * banner images) in place of an image URL, since presigned URLs expire.
 *
 * @param key the file's S3 key, from uploadToS3
 */
export function mediaPath(key: string): string {
  return `${MEDIA_PATH_PREFIX}${key}`;
}

/** Whether an image src points at an image we host in S3 */
export function isMediaPath(src: string | undefined): src is string {
  return !!src?.startsWith(MEDIA_PATH_PREFIX);
}
