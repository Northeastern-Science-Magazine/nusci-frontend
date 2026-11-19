'use server';

import { api, ApiResponse } from './api';

/* Archived (print) magazine issues, whose PDFs and covers live in S3 */

export type ArchivedIssue = {
  issueNumber: number;
  title: string;
  pdfUrl: string; // presigned, expires after an hour
  coverUrl: string; // rendered from the PDF's first page, presigned, expires after an hour
};

export type ArchivedIssueCreate = {
  issueNumber: number;
  title: string;
  pdfKey: string;
};

export interface MagazineIssue {
  id: string;
  issueNumber: number;
  thumbnailUrl: string;
  title: string;
  href: string;
}

function archivedIssueToMagazine(issue: ArchivedIssue): MagazineIssue {
  return {
    id: `issue-${issue.issueNumber}`,
    issueNumber: issue.issueNumber,
    thumbnailUrl: issue.coverUrl,
    title: issue.title,
    // stable link that redirects to a fresh presigned URL
    href: `/archive/${issue.issueNumber}`,
  };
}

/**
 * All archived print issues, in issue number order (oldest first).
 */
export async function getMagazineIssues(): Promise<MagazineIssue[]> {
  const response = await apiGetArchivedIssues();
  if (!response.ok) {
    console.warn('Get archived issues failed');
    return [];
  }

  return response.data
    .map(archivedIssueToMagazine)
    .sort((a, b) => a.issueNumber - b.issueNumber);
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
