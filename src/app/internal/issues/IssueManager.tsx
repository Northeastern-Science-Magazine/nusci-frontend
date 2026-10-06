'use client';

import { useState } from 'react';
import Text from '@/design-system/primitives/Text/Text';
import Card from '@/design-system/primitives/Card';
import { Box } from '@/design-system/primitives/Box/Box';
import { Form, FormField } from '@/design-system/primitives/Form';
import TextInput from '@/design-system/primitives/TextInput';
import Button from '@/design-system/primitives/Button';
import {
  IssueSummary,
  apiCreateIssue,
  apiDeleteIssue,
  apiUpdateIssue,
} from '@/lib/api/issues';

interface IssueFormValues {
  issueNumber: string;
  issueName: string;
  pages: string;
}

const WHOLE_NUMBER = /^\d+$/;

function nextIssueNumber(issues: IssueSummary[]): number {
  return issues.reduce((max, issue) => Math.max(max, issue.issueNumber), 0) + 1;
}

function sortIssues(issues: IssueSummary[]): IssueSummary[] {
  return [...issues].sort((a, b) => b.issueNumber - a.issueNumber);
}

function toRequestBody(data: IssueFormValues) {
  return {
    issueNumber: Number(data.issueNumber),
    issueName: data.issueName.trim(),
    pages: Number(data.pages),
  };
}

/** The number / name / page count inputs, shared by the create and edit forms. */
function IssueFields() {
  return (
    <>
      <FormField<IssueFormValues>
        name="issueNumber"
        rules={{
          required: 'Issue number is required',
          validate: (value) =>
            (WHOLE_NUMBER.test(value) && Number(value) > 0) ||
            'Issue number must be a positive whole number',
        }}
      >
        <TextInput
          label="Issue Number *"
          placeholder="e.g. 62"
          className="w-full"
        />
      </FormField>

      <FormField<IssueFormValues>
        name="issueName"
        rules={{
          validate: (value) =>
            value.trim().length > 0 || 'Issue name is required',
        }}
      >
        <TextInput
          label="Issue Name *"
          placeholder="e.g. Spring 2027"
          className="w-full"
        />
      </FormField>

      <FormField<IssueFormValues>
        name="pages"
        rules={{
          required: 'Page count is required',
          validate: (value) =>
            WHOLE_NUMBER.test(value) || 'Page count must be a whole number',
        }}
      >
        <TextInput
          label="Page Count *"
          placeholder="e.g. 40"
          className="w-full"
        />
      </FormField>
    </>
  );
}

interface IssueManagerProps {
  initialIssues: IssueSummary[];
  loadError: string | null;
}

export default function IssueManager({
  initialIssues,
  loadError,
}: IssueManagerProps) {
  const [issues, setIssues] = useState<IssueSummary[]>(initialIssues);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [created, setCreated] = useState<IssueSummary | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Bumped after a successful create to remount the Form with fresh defaults
  const [formKey, setFormKey] = useState(0);

  const onSubmit = async (data: IssueFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setCreated(null);

    const response = await apiCreateIssue(toRequestBody(data));

    setIsSubmitting(false);

    if (!response.ok) {
      setSubmitError(response.error);
      return;
    }

    setIssues(sortIssues([...issues, response.data]));
    setCreated(response.data);
    setFormKey((k) => k + 1);
  };

  return (
    <Box className="bg-gray min-h-screen">
      <Box className="max-w-6xl mx-auto px-4 laptop:px-8 py-12">
        <Text style="bold" size={36} color="black" className="mb-8">
          Magazine Issues
        </Text>

        <Box className="grid grid-cols-1 laptop:grid-cols-12 gap-8 items-start">
          <Card
            color="white"
            className="col-span-1 laptop:col-span-5 shadow-xl p-8"
          >
            <Text style="bold" size={24} color="black" className="mb-6">
              Create a New Issue
            </Text>
            <Form<IssueFormValues>
              key={formKey}
              onSubmit={onSubmit}
              className="space-y-6"
              options={{
                defaultValues: {
                  issueNumber: String(nextIssueNumber(issues)),
                  issueName: '',
                  pages: '',
                },
              }}
            >
              <IssueFields />

              {submitError && (
                <Text style="regular" size={14} color="red">
                  {submitError}
                </Text>
              )}
              {created && (
                <Text style="regular" size={14} color="forest-green">
                  Created Issue #{created.issueNumber}: {created.issueName}
                </Text>
              )}

              <Button
                type="submit"
                variant="default"
                color="forest-green"
                size="md"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Issue'}
              </Button>
            </Form>
          </Card>

          <Card
            color="white"
            className="col-span-1 laptop:col-span-7 shadow-xl p-8"
          >
            <Text style="bold" size={24} color="black" className="mb-6">
              Existing Issues
            </Text>
            {loadError ? (
              <Text style="regular" size={16} color="red">
                Unable to load issues: {loadError}
              </Text>
            ) : issues.length === 0 ? (
              <Text style="regular" size={16} color="black">
                No issues yet.
              </Text>
            ) : (
              <Box className="divide-y divide-gray-200">
                {issues.map((issue) => (
                  <IssueRow
                    key={issue.issueNumber}
                    issue={issue}
                    onUpdated={(updated) => {
                      setCreated(null);
                      setIssues((current) =>
                        sortIssues(
                          current.map((i) =>
                            i.issueNumber === issue.issueNumber ? updated : i,
                          ),
                        ),
                      );
                    }}
                    onDeleted={() => {
                      setCreated(null);
                      setIssues((current) =>
                        current.filter(
                          (i) => i.issueNumber !== issue.issueNumber,
                        ),
                      );
                    }}
                  />
                ))}
              </Box>
            )}
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

interface IssueRowProps {
  issue: IssueSummary;
  onUpdated: (issue: IssueSummary) => void;
  onDeleted: () => void;
}

function IssueRow({ issue, onUpdated, onDeleted }: IssueRowProps) {
  const [mode, setMode] = useState<'view' | 'edit' | 'confirmDelete'>('view');
  const [error, setError] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);

  const changeMode = (next: typeof mode) => {
    setError(null);
    setMode(next);
  };

  const onSave = async (data: IssueFormValues) => {
    setIsBusy(true);
    const response = await apiUpdateIssue(
      issue.issueNumber,
      toRequestBody(data),
    );
    setIsBusy(false);

    if (!response.ok) {
      setError(response.error);
      return;
    }

    changeMode('view');
    onUpdated(response.data);
  };

  const onConfirmDelete = async () => {
    setIsBusy(true);
    const response = await apiDeleteIssue(issue.issueNumber);
    setIsBusy(false);

    if (!response.ok) {
      setError(response.error);
      return;
    }

    onDeleted();
  };

  if (mode === 'edit') {
    return (
      <Box className="py-4">
        <Form<IssueFormValues>
          onSubmit={onSave}
          className="space-y-4"
          options={{
            defaultValues: {
              issueNumber: String(issue.issueNumber),
              issueName: issue.issueName,
              pages: String(issue.pages),
            },
          }}
        >
          <IssueFields />
          {error && (
            <Text style="regular" size={14} color="red">
              {error}
            </Text>
          )}
          <Box className="flex gap-3">
            <Button
              type="submit"
              variant="default"
              color="forest-green"
              size="sm"
              disabled={isBusy}
            >
              {isBusy ? 'Saving...' : 'Save'}
            </Button>
            <Button
              onClick={() => changeMode('view')}
              variant="outline"
              color="black"
              size="sm"
              disabled={isBusy}
            >
              Cancel
            </Button>
          </Box>
        </Form>
      </Box>
    );
  }

  return (
    <Box className="py-3">
      <Box className="flex items-center justify-between gap-4">
        <Box>
          <Text style="regular" size={18} color="black">
            #{issue.issueNumber} · {issue.issueName}
          </Text>
          <Text style="regular" size={14} color="sage-green">
            {issue.pages} pages
          </Text>
        </Box>

        {mode === 'confirmDelete' ? (
          <Box className="flex items-center gap-3">
            <Text
              style="regular"
              size={14}
              color="black"
              className="whitespace-nowrap"
            >
              Delete this issue?
            </Text>
            <Button
              onClick={onConfirmDelete}
              variant="default"
              color="red"
              size="sm"
              disabled={isBusy}
            >
              {isBusy ? 'Deleting...' : 'Delete'}
            </Button>
            <Button
              onClick={() => changeMode('view')}
              variant="outline"
              color="black"
              size="sm"
              disabled={isBusy}
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <Box className="flex gap-3">
            <Button
              onClick={() => changeMode('edit')}
              variant="outline"
              color="black"
              size="sm"
            >
              Edit
            </Button>
            <Button
              onClick={() => changeMode('confirmDelete')}
              variant="outline"
              color="red"
              size="sm"
            >
              Delete
            </Button>
          </Box>
        )}
      </Box>
      {error && (
        <Text style="regular" size={14} color="red" className="mt-2">
          {error}
        </Text>
      )}
    </Box>
  );
}
