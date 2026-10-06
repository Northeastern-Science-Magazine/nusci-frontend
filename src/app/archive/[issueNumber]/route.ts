import { NextRequest, NextResponse } from 'next/server';
import { apiGetArchivedIssue } from '@/lib/api/archive';

/**
 * Stable link to an archived issue's PDF.
 * Presigned S3 URLs expire, so this looks up a fresh one on every visit.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { issueNumber: string } },
) {
  const issueNumber = Number(params.issueNumber);
  if (!Number.isInteger(issueNumber) || issueNumber <= 0) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  const response = await apiGetArchivedIssue(issueNumber);
  if (!response.ok) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  return NextResponse.redirect(response.data.pdfUrl);
}
