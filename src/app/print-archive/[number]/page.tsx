import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getPrintIssueNumbers,
  issuePdfAvailable,
  issuePdfUrl,
} from '@/lib/helpers/printIssues';

export default async function PrintIssuePage({
  params,
}: {
  params: { number: string };
}) {
  const issueNumber = Number(params.number);
  if (!Number.isInteger(issueNumber) || issueNumber < 1) notFound();

  const issueNumbers = await getPrintIssueNumbers(); // newest first
  const idx = issueNumbers.indexOf(issueNumber);
  if (idx === -1) notFound();

  const newer = issueNumbers[idx - 1];
  const older = issueNumbers[idx + 1];
  const pdfUrl = issuePdfUrl(issueNumber);
  const pdfAvailable = await issuePdfAvailable(issueNumber);

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <nav className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm">
        <Link href="/print-archive" className="hover:underline">
          ← Back to Print Archive
        </Link>
        <h1 className="text-lg font-bold">Issue {issueNumber}</h1>
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
      {pdfAvailable ? (
        <>
          <iframe
            src={pdfUrl}
            title={`NU Sci Magazine Issue ${issueNumber}`}
            className="h-[80vh] w-full rounded border"
          />
          <p className="mt-3 text-center text-sm">
            Viewer not loading?{' '}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Open the PDF directly
            </a>
            .
          </p>
        </>
      ) : (
        <div className="flex h-[80vh] w-full items-center justify-center rounded border bg-gray-200 text-center text-gray-600">
          <p>
            Issue {issueNumber} is unavailable right now.
            <br />
            Please try again later.
          </p>
        </div>
      )}
    </main>
  );
}
