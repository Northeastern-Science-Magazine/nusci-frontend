import { api, ApiResponse } from './api';

export interface IssueSummary {
  issueNumber: number;
  issueName: string;
  pages: number;
  creationTime: string;
}

export interface IssueCreate {
  issueNumber: number;
  issueName: string;
  pages: number;
}

export async function apiGetAllIssues(): Promise<ApiResponse<IssueSummary[]>> {
  return api<IssueSummary[]>('GET', '/issue-map/all');
}

export async function apiCreateIssue(
  data: IssueCreate,
): Promise<ApiResponse<IssueSummary>> {
  return api<IssueSummary>('POST', '/issue-map/create', data);
}

export async function apiUpdateIssue(
  issueNumber: number,
  data: Partial<IssueCreate>,
): Promise<ApiResponse<IssueSummary>> {
  return api<IssueSummary>('PATCH', `/issue-map/${issueNumber}`, data);
}

export async function apiDeleteIssue(
  issueNumber: number,
): Promise<ApiResponse<IssueSummary>> {
  return api<IssueSummary>('DELETE', `/issue-map/${issueNumber}`);
}
