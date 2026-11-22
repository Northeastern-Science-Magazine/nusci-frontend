import Image from 'next/image';
import Link from 'next/link';
import { getMagazineIssues } from '@/lib/api/archive';

export const metadata = {
  title: 'Print Archive | NU Sci Magazine',
  description: "Browse every issue of NU Sci Magazine's print archive.",
};

export default async function PrintArchivePage() {
  // newest first
  const magazines = (await getMagazineIssues()).reverse();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-center text-3xl font-bold">
        NU Sci Magazine&apos;s Print Archive
      </h1>
      <hr className="my-8" />
      {magazines.length === 0 ? (
        <p className="text-center text-gray-600">
          No issues are available right now. Please try again later.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {magazines.map(({ issueNumber, thumbnailUrl, title }) => (
            <li
              key={issueNumber}
              id={`issue-${issueNumber}`}
              className="scroll-mt-24 rounded p-2 target:bg-black/5 target:ring-2 target:ring-black/20"
            >
              <Link
                href={`/print-archive/${issueNumber}`}
                className="group block text-center"
              >
                {/* presigned S3 URLs skip the next/image optimizer */}
                <Image
                  src={thumbnailUrl}
                  alt={`NU Sci Magazine Issue ${issueNumber} cover`}
                  width={300}
                  height={400}
                  unoptimized
                  className="h-auto w-full rounded shadow transition group-hover:shadow-lg"
                />
                <span className="mt-2 block text-sm font-medium group-hover:underline">
                  Issue {issueNumber}
                </span>
                {title ? (
                  <span className="block text-xs text-gray-600">{title}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
