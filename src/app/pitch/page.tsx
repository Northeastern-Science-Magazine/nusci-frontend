'use client';

import { useState, type FormEvent } from 'react';
import { submitPitch } from '@/lib/api/pitch';

export default function PitchPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await submitPitch({
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        topic: String(data.get('topic') ?? ''),
        draftUrl: String(data.get('draftUrl') ?? '').trim(),
      });

      if (!response.ok) {
        setError(response.error);
        return;
      }

      setSuccess(response.message);
      form.reset();
    } catch {
      setError('Unable to submit your pitch. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    'w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#800020]';

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Pitch to NU Sci</h1>

      <p className="mt-4 text-gray-600">
        Thank you for your interest in writing for NU Sci! Please provide
        us with the details below and we will reach out shortly via email.
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <fieldset disabled={isSubmitting} className="space-y-6">
          <div>
            <label htmlFor="name" className="mb-2 block font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              required
              maxLength={200}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block font-medium">
              Northeastern email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="topic" className="mb-2 block font-medium">
              Briefly describe your idea/article topic
            </label>
            <textarea
              id="topic"
              name="topic"
              required
              rows={6}
              maxLength={10000}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="draftUrl" className="mb-2 block font-medium">
              Draft link (optional)
            </label>
            <p id="draft-help" className="mb-2 text-sm text-gray-600">
              If you already have a draft, link it here. Set sharing to
              “Anyone with the link can edit.”
            </p>
            <input
              id="draftUrl"
              name="draftUrl"
              type="url"
              aria-describedby="draft-help"
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-[#800020] px-6 py-3 font-medium text-white disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting…' : 'Submit pitch'}
          </button>
        </fieldset>

        {error && (
          <p role="alert" className="mt-4 text-red-700">
            {error}
          </p>
        )}

        {success && (
          <p role="status" className="mt-4 text-green-700">
            {success}
          </p>
        )}
      </form>
    </main>
  );
}