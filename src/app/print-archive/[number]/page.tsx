import Link from 'next/link';
import { permanentRedirect, redirect } from 'next/navigation';
import { getSortedArchivedIssues } from '@/lib/api/archive';

export default async function PrintIssuePage({
  params,
}: {
  params: { number: string };
}) {
  const issueNumber = Number(params.number);
  // not an issue number, so show the full archive instead
  if (!Number.isInteger(issueNumber) || issueNumber < 1) {
    redirect('/print-archive');
  }
  // canonical URL is the bare number, e.g. 01 or 1e0 -> 1
  if (params.number !== String(issueNumber)) {
    permanentRedirect(`/print-archive/${issueNumber}`);
  }

  const response = await getSortedArchivedIssues();

  if (!response.ok) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-sm">
          <Link href="/print-archive" className="hover:underline">
            ← Back to Print Archive
          </Link>
        </nav>
        <div className="flex h-[80vh] w-full items-center justify-center rounded border bg-gray-200 text-center text-gray-600">
          <p>
            Issue {issueNumber} is unavailable right now.
            <br />
            Please try again later.
          </p>
        </div>
      </main>
    );
  }

  // newest first
  const issues = response.data;
  const idx = issues.findIndex((i) => i.issueNumber === issueNumber);
  // no such issue (yet), so show the full archive instead
  if (idx === -1) redirect('/print-archive');

  const issue = issues[idx];
  const newer = issues[idx - 1]?.issueNumber;
  const older = issues[idx + 1]?.issueNumber;

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <nav className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm">
        <Link href="/print-archive" className="hover:underline">
          ← Back to Print Archive
        </Link>
        <h1 className="text-lg font-bold">
          Issue {issueNumber}
          {issue.title ? `: ${issue.title}` : ''}
        </h1>
        <div className="flex gap-4">
          {older !== undefined ? (
            <Link href={`/print-archive/${older}`} className="hover:underline">
              ‹ Issue {older}
            </Link>
          ) : null}
          {newer !== undefined ? (
            <Link href={`/print-archive/${newer}`} className="hover:underline">
              Issue {newer} ›
            </Link>
          ) : null}
        </div>
      </nav>
      <iframe
        src={issue.pdfUrl}
        title={`NU Sci Magazine Issue ${issueNumber}`}
        className="h-[80vh] w-full rounded border"
      />
      <p className="mt-3 text-center text-sm">
        Viewer not loading?{' '}
        <a
          href={issue.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Open the PDF directly
        </a>
        .
      </p>
    </main>
  );
}
