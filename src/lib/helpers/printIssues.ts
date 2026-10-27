import { apiGetAllIssues } from '@/lib/api/issues';

const THUMBNAIL_BASE =
  'https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails';

/** Latest issue to assume when the issue-map API is unreachable. */
const FALLBACK_LATEST_ISSUE = 60;

export function issueThumbnailUrl(issueNumber: number): string {
  return `${THUMBNAIL_BASE}/issue${issueNumber}.png`;
}

/** PDFs are served from S3; the base URL is configured per environment. */
export function issuePdfUrl(issueNumber: number): string {
  const base = (process.env.NEXT_PUBLIC_ISSUE_PDF_URL ?? '').replace(/\/$/, '');
  return `${base}/issue${issueNumber}.pdf`;
}

/** Issue numbers, newest first. */
export async function getPrintIssueNumbers(): Promise<number[]> {
  const res = await apiGetAllIssues();
  const numbers =
    res.ok && res.data.length > 0
      ? res.data.map((i) => i.issueNumber)
      : Array.from({ length: FALLBACK_LATEST_ISSUE }, (_, i) => i + 1);
  return Array.from(new Set(numbers)).sort((a, b) => b - a);
}
