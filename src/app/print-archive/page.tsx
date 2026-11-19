import Image from 'next/image';
import Link from 'next/link';
import {
  getPrintIssueNumbers,
  issueThumbnailUrl,
} from '@/lib/helpers/printIssues';

export const metadata = {
  title: 'Print Archive | NU Sci Magazine',
  description: "Browse every issue of NU Sci Magazine's print archive.",
};

export default async function PrintArchivePage() {
  const issueNumbers = await getPrintIssueNumbers();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-center text-3xl font-bold">
        NU Sci Magazine&apos;s Print Archive
      </h1>
      <hr className="my-8" />
      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {issueNumbers.map((n) => (
          <li
            key={n}
            id={`issue-${n}`}
            className="scroll-mt-24 rounded p-2 target:bg-black/5 target:ring-2 target:ring-black/20"
          >
            <Link
              href={`/print-archive/${n}`}
              className="group block text-center"
            >
              <Image
                src={issueThumbnailUrl(n)}
                alt={`NU Sci Magazine Issue ${n} cover`}
                width={300}
                height={400}
                className="h-auto w-full rounded shadow transition group-hover:shadow-lg"
              />
              <span className="mt-2 block text-sm font-medium group-hover:underline">
                Issue {n}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
