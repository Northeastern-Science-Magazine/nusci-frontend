import { NextRequest, NextResponse } from 'next/server';
import { apiGetArchivedIssue } from '@/lib/api/archive';

/**
 * Stable link to an archived issue's PDF.
 * Presigned S3 URLs expire, so this looks up a fresh one on every visit.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { number: string } },
) {
  const issueNumber = Number(params.number);
  if (!Number.isInteger(issueNumber) || issueNumber < 1) {
    return new NextResponse('Issue not found', { status: 404 });
  }

  const response = await apiGetArchivedIssue(issueNumber);
  if (!response.ok) {
    return new NextResponse('Issue not found', { status: 404 });
  }

  return NextResponse.redirect(response.data.pdfUrl);
}
