'use client';

import { useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller } from 'react-hook-form';
import Box from '@/design-system/primitives/Box';
import Button from '@/design-system/primitives/Button';
import Card from '@/design-system/primitives/Card';
import Text from '@/design-system/primitives/Text';
import TextInput from '@/design-system/primitives/TextInput';
import { Form, FormField } from '@/design-system/primitives/Form';
import { ProgressBar } from '@/design-system/primitives/ProgressBar/ProgressBar';
import {
  ArchivedIssue,
  apiCreateArchivedIssue,
  apiDeleteArchivedIssue,
} from '@/lib/api/archive';
import { uploadToS3 } from '@/lib/helpers/uploadToS3';

interface ArchiveFormValues {
  issueNumber: string;
  title: string;
  publicationDate: string;
  pdf?: File;
  cover?: File;
}

const EMPTY_FORM: ArchiveFormValues = {
  issueNumber: '',
  title: '',
  publicationDate: '',
  pdf: undefined,
  cover: undefined,
};

interface ArchiveManagerProps {
  issues: ArchivedIssue[];
  loadError: string | null;
}

export default function ArchiveManager({
  issues,
  loadError,
}: ArchiveManagerProps) {
  const router = useRouter();
  // Bumped after a successful upload to remount the Form and clear it
  const [formKey, setFormKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  const onSubmit = async (data: ArchiveFormValues) => {
    if (!data.pdf) return;
    setError(null);
    setSubmitting(true);

    try {
      setStatus('Uploading PDF...');
      setProgress(0);
      const pdfKey = await uploadToS3('archive', data.pdf, (fraction) =>
        setProgress(Math.round(fraction * 100)),
      );

      let coverKey: string | undefined;
      if (data.cover) {
        setStatus('Uploading cover...');
        setProgress(0);
        coverKey = await uploadToS3('archive', data.cover, (fraction) =>
          setProgress(Math.round(fraction * 100)),
        );
      }

      setStatus('Saving issue...');
      setProgress(null);
      const response = await apiCreateArchivedIssue({
        issueNumber: Number(data.issueNumber),
        title: data.title.trim(),
        publicationDate: data.publicationDate,
        pdfKey,
        coverKey,
      });
      if (!response.ok) {
        throw new Error(response.error);
      }

      setStatus(`Issue ${response.data.issueNumber} archived.`);
      setFormKey((k) => k + 1);
      router.refresh();
    } catch (e) {
      setStatus(null);
      setError(e instanceof Error ? e.message : 'Upload failed.');
    } finally {
      setSubmitting(false);
      setProgress(null);
    }
  };

  const onDelete = async (issueNumber: number) => {
    if (
      !window.confirm(
        `Delete issue ${issueNumber}? It will be removed from the site, but its files are kept and it can be restored.`,
      )
    ) {
      return;
    }

    setError(null);
    setDeleting(issueNumber);
    const response = await apiDeleteArchivedIssue(issueNumber);
    setDeleting(null);

    if (!response.ok) {
      setError(response.error);
      return;
    }
    setStatus(`Issue ${issueNumber} deleted.`);
    router.refresh();
  };

  return (
    <Box className="max-w-6xl mx-auto px-4 laptop:px-8 py-10 space-y-8">
      <Text style="bold" size={36} color="black">
        Magazine Archive
      </Text>

      <Card color="white" className="shadow-xl p-8">
        <Text style="bold" size={24} color="black" className="mb-6">
          Upload an Issue
        </Text>
        <Form<ArchiveFormValues>
          key={formKey}
          onSubmit={onSubmit}
          options={{ defaultValues: EMPTY_FORM }}
          className="space-y-5"
        >
          <Box className="grid grid-cols-1 laptop:grid-cols-3 gap-5">
            <FormField<ArchiveFormValues>
              name="issueNumber"
              rules={{
                required: 'Issue number is required',
                validate: (value) =>
                  (Number.isInteger(Number(value)) && Number(value) > 0) ||
                  'Issue number must be a positive whole number',
              }}
            >
              <TextInput
                label="Issue Number *"
                placeholder="61"
                type="number"
                min={1}
                className="w-full"
              />
            </FormField>
            <FormField<ArchiveFormValues>
              name="title"
              rules={{ required: 'Title is required' }}
            >
              <TextInput
                label="Title *"
                placeholder="Issue 61: Beyond"
                className="w-full"
              />
            </FormField>
            <FormField<ArchiveFormValues>
              name="publicationDate"
              rules={{ required: 'Publication date is required' }}
            >
              <TextInput
                label="Publication Date *"
                type="date"
                className="w-full"
              />
            </FormField>
          </Box>

          <Box className="grid grid-cols-1 laptop:grid-cols-2 gap-5">
            <Controller
              name="pdf"
              rules={{ required: 'A PDF is required' }}
              render={({ field, fieldState }) => (
                <FileInput
                  label="Issue PDF *"
                  accept="application/pdf"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="cover"
              render={({ field }) => (
                <FileInput
                  label="Cover Image"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </Box>

          <Box className="flex items-center gap-6 flex-wrap">
            <Button
              type="submit"
              variant="default"
              color="forest-green"
              size="md"
              disabled={submitting}
            >
              Upload Issue
            </Button>
            {status && (
              <Text style="regular" size={14} color="black">
                {status}
              </Text>
            )}
            {progress !== null && (
              <ProgressBar
                percentComplete={progress ?? 0}
                color="forest-green"
              />
            )}
          </Box>
          {error && (
            <Text style="regular" size={14} color="red">
              {error}
            </Text>
          )}
        </Form>
      </Card>

      <Card color="white" className="shadow-xl p-8">
        <Text style="bold" size={24} color="black" className="mb-6">
          Archived Issues
        </Text>
        {loadError && (
          <Text style="regular" size={14} color="red">
            Couldn&apos;t load archived issues: {loadError}
          </Text>
        )}
        {!loadError && issues.length === 0 && (
          <Text style="regular" size={16} color="black">
            No issues have been archived yet.
          </Text>
        )}
        <Box className="divide-y divide-black/10">
          {issues.map((issue) => (
            <Box
              key={issue.issueNumber}
              className="flex items-center gap-6 py-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={issue.coverUrl ?? '/logo.png'}
                alt={`Cover of ${issue.title}`}
                className="h-20 w-16 object-cover border border-black/10"
              />
              <Box className="flex-1">
                <Text style="bold" size={18} color="black">
                  {issue.issueNumber}. {issue.title}
                </Text>
                <Text style="regular" size={14} color="black">
                  {new Date(issue.publicationDate).toLocaleDateString('en-US', {
                    timeZone: 'UTC',
                    year: 'numeric',
                    month: 'long',
                  })}
                </Text>
              </Box>
              <a
                href={`/archive/${issue.issueNumber}`}
                target="_blank"
                rel="noreferrer"
                className="underline text-sm"
              >
                View PDF
              </a>
              <Button
                variant="outline"
                color="red"
                size="sm"
                disabled={deleting === issue.issueNumber}
                onClick={() => onDelete(issue.issueNumber)}
              >
                {deleting === issue.issueNumber ? 'Deleting...' : 'Delete'}
              </Button>
            </Box>
          ))}
        </Box>
      </Card>
    </Box>
  );
}

interface FileInputProps {
  label: string;
  accept: string;
  value?: File;
  onChange: (file?: File) => void;
  error?: string;
}

/**
 * File picker styled like ImageUpload, with a unique id
 * so several can live on one page.
 */
function FileInput({ label, accept, value, onChange, error }: FileInputProps) {
  const id = useId();

  return (
    <Box className="flex flex-col gap-2">
      <Text style="regular" size={16} color="black">
        {label}
      </Text>
      <label
        htmlFor={id}
        className="p-4 border border-1 rounded-md cursor-pointer truncate"
      >
        {value
          ? `${value.name} (${(value.size / (1024 * 1024)).toFixed(1)} MB)`
          : 'Choose a file'}
      </label>
      <input
        id={id}
        type="file"
        accept={accept}
        onChange={(event) => onChange(event.target.files?.[0])}
        className="hidden"
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </Box>
  );
}
