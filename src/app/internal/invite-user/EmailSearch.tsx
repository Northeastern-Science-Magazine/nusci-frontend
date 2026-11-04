'use client';
import Text from '@/design-system/primitives/Text';
import TextInput from '@/design-system/primitives/TextInput';
import Badge from '@/design-system/primitives/Badge';
import { Dispatch, SetStateAction, useState } from 'react';

const NORTHEASTERN_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/i;

export default function EmailSearch({
  emails,
  setEmails,
}: {
  emails: string[];
  setEmails: Dispatch<SetStateAction<string[]>>;
}) {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const addEmail = () => {
    const trimmed = email.trim();
    if (!trimmed) return;

    if (!NORTHEASTERN_EMAIL_REGEX.test(trimmed)) {
      setError('Email must be a valid @northeastern.edu address');
      return;
    }

    setEmails((prev) => [...prev, trimmed]);
    setEmail('');
    setError(null);
  };

  const renderEmailBadge = (email: string) => {
    return (
      <div key={email} className="max-w-full">
        <Badge
          variant="outline"
          color="black"
          className="inline-flex max-w-full items-center gap-2 rounded-full bg-gray-50 py-1.5 pl-4 pr-2 shadow-sm transition-colors hover:bg-gray-100"
        >
          <Text
            as="span"
            color="black"
            className="truncate leading-none"
            size={16}
          >
            {email}
          </Text>
          <button
            type="button"
            aria-label={`Remove ${email}`}
            className="flex size-6 shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            onClick={() => setEmails((prev) => prev.filter((e) => e !== email))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </Badge>
      </div>
    );
  };

  const renderedEmails = emails.map(renderEmailBadge);

  return (
    <div className="w-full space-y-4">
      <div
        className={`email-search w-full px-2 [&_label]:mb-2 [&_label]:block [&_label]:text-sm [&_label]:font-semibold [&_label]:uppercase [&_label]:tracking-wide [&_label]:text-gray-700 [&_input]:min-h-14 [&_input]:w-full [&_input]:rounded-xl [&_input]:px-5 [&_input]:py-4 [&_input]:text-lg [&_input]:transition-shadow focus-within:[&_input]:ring-2 focus-within:[&_input]:ring-black/10 ${
          error
            ? '[&_input]:border-red-500 focus-within:[&_input]:ring-red-500/20'
            : ''
        }`}
      >
        <TextInput
          size="lg"
          label="Email"
          placeholder="name@northeastern.edu"
          value={email}
          onChange={(v: string) => {
            setEmail(v);
            if (error) setError(null);
          }}
          onKeyDown={(e: any) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addEmail();
            }
          }}
        />
        {error ? (
          <p role="alert" className="mt-2 text-sm font-medium text-red-600">
            {error}
          </p>
        ) : (
          <p className="mt-2 text-xs text-gray-400">
            Press Enter to add each address.
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-2 px-2 empty:hidden">
        {renderedEmails}
      </div>
    </div>
  );
}
