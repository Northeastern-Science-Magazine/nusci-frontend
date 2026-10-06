'use server';

import { api, ApiResponse } from './api';

/* Archived (print) magazine issues, whose PDFs and covers live in S3 */

export type ArchivedIssue = {
  issueNumber: number;
  title: string;
  publicationDate: string;
  pdfUrl: string; // presigned, expires after an hour
  coverUrl: string | null; // presigned, expires after an hour
};

export type ArchivedIssueCreate = {
  issueNumber: number;
  title: string;
  publicationDate: string;
  pdfKey: string;
  coverKey?: string;
};

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

export interface MagazineIssue {
  id: string;
  issueNumber: number;
  thumbnailUrl: string;
  title: string;
  date: string;
  href: string;
}

// Issues still hosted on the legacy nusci-issuu site. Used until each one is
// uploaded to the S3 archive, at which point the archived version replaces it.
const LEGACY_ARCHIVE_URL =
  'https://northeasternsciencemagazine.github.io/nusci-issuu/';
const LEGACY_ISSUE_COUNT = 60;
const LEGACY_MAGAZINES: MagazineIssue[] = Array.from(
  { length: LEGACY_ISSUE_COUNT },
  (_, i) => {
    const issueNumber = LEGACY_ISSUE_COUNT - i;
    return {
      id: `issue-${issueNumber}`,
      issueNumber,
      thumbnailUrl: `${LEGACY_ARCHIVE_URL}thumbnails/issue${issueNumber}.png`,
      title: `Issue ${issueNumber}`,
      date: '',
      href: LEGACY_ARCHIVE_URL,
    };
  },
);

function archivedIssueToMagazine(issue: ArchivedIssue): MagazineIssue {
  return {
    id: `issue-${issue.issueNumber}`,
    issueNumber: issue.issueNumber,
    thumbnailUrl: issue.coverUrl ?? '/logo.png',
    title: issue.title,
    date: new Date(issue.publicationDate).getFullYear().toString(),
    // stable link that redirects to a fresh presigned URL
    href: `/archive/${issue.issueNumber}`,
  };
}

/**
 * All print issues, newest first: archived issues from S3,
 * plus legacy issues that haven't been uploaded yet.
 */
export async function getMagazineIssues(): Promise<MagazineIssue[]> {
  const response = await apiGetArchivedIssues();
  if (!response.ok) {
    console.warn('Get archived issues failed, using legacy issues only');
    return LEGACY_MAGAZINES;
  }

  const byNumber = new Map<number, MagazineIssue>(
    LEGACY_MAGAZINES.map((issue) => [issue.issueNumber, issue]),
  );
  response.data.forEach((issue) =>
    byNumber.set(issue.issueNumber, archivedIssueToMagazine(issue)),
  );

  return Array.from(byNumber.values()).sort(
    (a, b) => b.issueNumber - a.issueNumber,
  );
}

export async function apiGetArchivedIssues(): Promise<
  ApiResponse<ArchivedIssue[]>
> {
  return api<ArchivedIssue[]>('GET', '/archive');
}

export async function apiGetArchivedIssue(
  issueNumber: number,
): Promise<ApiResponse<ArchivedIssue>> {
  return api<ArchivedIssue>('GET', `/archive/${issueNumber}`);
}

export async function apiCreateArchivedIssue(
  issue: ArchivedIssueCreate,
): Promise<ApiResponse<ArchivedIssue>> {
  return api<ArchivedIssue>('POST', '/archive', issue);
}

export async function apiDeleteArchivedIssue(
  issueNumber: number,
): Promise<ApiResponse<{ message: string }>> {
  return api<{ message: string }>('DELETE', `/archive/${issueNumber}`);
}

export async function apiGetUploadUrl(
  request: UploadUrlRequest,
): Promise<ApiResponse<UploadUrlResponse>> {
  return api<UploadUrlResponse>('POST', '/media/upload-url', request);
}
