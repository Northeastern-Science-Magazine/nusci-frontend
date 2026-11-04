import { NextRequest, NextResponse } from 'next/server';
import { apiGetDownloadUrl } from '@/lib/api/media';

/**
 * Stable link to an uploaded image, i.e. /media/prod/images/<uuid>.jpg.
 *
 * Proxies the file rather than redirecting to a presigned URL, so next/image
 * can optimize it like any local image. Every upload gets a new key and is
 * never overwritten, so the response can be cached forever.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { key: string[] } },
) {
  const response = await apiGetDownloadUrl(params.key.join('/'));
  if (!response.ok) {
    return new NextResponse(null, { status: 404 });
  }

  const image = await fetch(response.data.url, { cache: 'no-store' });
  if (!image.ok || !image.body) {
    // S3 answers 403 for a missing key, since we can't list the bucket
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(image.body, {
    headers: {
      'Content-Type':
        image.headers.get('Content-Type') ?? 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
