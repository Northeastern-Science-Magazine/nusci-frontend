'use client';
import Box from '@/design-system/primitives/Box';
import Button from '@/design-system/primitives/Button';
import Checkbox from '@/design-system/primitives/Checkbox';
import { Form, FormField } from '@/design-system/primitives/Form';
import Text from '@/design-system/primitives/Text';
import { Roles } from '@/lib/types/types';
import { useState } from 'react';
import { apiInviteUser } from '@/lib/api/users';
import { SubmitHandler } from 'react-hook-form';
import EmailSearch from './EmailSearch';
import { Controller } from 'react-hook-form';

export default function InviteUser() {
  type InviteUserFormValues = {
    emails: string[];
    roles: string[];
  };

  const [emails, setEmails] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);

  const canSend: boolean = emails.length !== 0 && roles.length !== 0;

  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit: SubmitHandler<InviteUserFormValues> = async () => {
    setIsSending(true);
    setError(null);
    setSuccess(null);

    // Checkboxes hold enum keys ("Author"); the backend expects enum values ("author").
    const roleValues = roles.map((role) => Roles[role as keyof typeof Roles]);
    const result = await apiInviteUser(emails, roleValues);

    if (result.ok) {
      const { invited, skipped, failed } = result.data;
      const notes: string[] = [];
      if (invited.length) {
        notes.push(
          `Invited ${invited.length} ${invited.length === 1 ? 'person' : 'people'}.`,
        );
      }
      if (skipped.length) {
        notes.push(`Skipped (already have an account): ${skipped.join(', ')}.`);
      }
      setSuccess(notes.length ? notes.join(' ') : null);
      setError(failed.length ? `Failed to send: ${failed.join(', ')}.` : null);
      // Failed addresses stay in the list so the admin can retry them.
      setEmails(failed);
    } else {
      setError(result.error);
    }
    setIsSending(false);
  };

  return (
    <div
      id="invite-user"
      className="bg-sage-green size-full min-h-screen px-4 py-10 sm:py-16"
    >
      <Box className="mx-auto w-full max-w-2xl space-y-6 rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-black/5 sm:p-10">
        <div className="space-y-1 border-b border-gray-100 pb-6">
          <Text
            color="sage-green"
            size={36}
            style="bold"
            className="text-left leading-tight tracking-tight"
          >
            Invite a user
          </Text>
          <p className="text-sm text-gray-500">
            Add one or more email addresses and choose the roles they&apos;ll
            receive.
          </p>
        </div>

        <Form<InviteUserFormValues> onSubmit={onSubmit}>
          <div className="space-y-8">
            <FormField name="emails">
              <EmailSearch emails={emails} setEmails={setEmails}></EmailSearch>
            </FormField>

            <div id="roles" className="scroll-mt-[80px] px-2">
              <Controller
                name="roles"
                render={({ field }) => (
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold uppercase tracking-wide text-gray-700">
                      {'Categories'}
                    </label>
                    <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-4 transition-colors focus-within:border-gray-300 [&>div]:flex [&>div]:flex-wrap [&>div]:gap-x-8 [&>div]:gap-y-3 [&_label]:mb-0 [&_label]:cursor-pointer [&_label]:text-gray-800">
                      <Checkbox
                        options={Object.keys(Roles)}
                        value={field.value || []}
                        onChange={(newValue: string[]) => {
                          field.onChange(newValue);
                          setRoles(newValue);
                        }}
                      />
                    </div>
                  </div>
                )}
              />
            </div>

            {error && (
              <p role="alert" className="px-2 text-sm font-medium text-red-600">
                {error}
              </p>
            )}
            {success && (
              <p
                role="status"
                className="px-2 text-sm font-medium text-green-700"
              >
                {success}
              </p>
            )}

            <div className="flex flex-col-reverse items-stretch gap-3 border-t border-gray-100 px-2 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                {emails.length} {emails.length === 1 ? 'person' : 'people'}{' '}
                &middot; {roles.length} {roles.length === 1 ? 'role' : 'roles'}
              </p>
              <Button
                color={canSend ? 'forest-green' : 'border'}
                type="submit"
                disabled={!canSend || isSending}
                className="w-full rounded-xl px-8 py-3 font-semibold shadow-sm transition-all enabled:hover:-translate-y-0.5 enabled:hover:shadow-md disabled:cursor-not-allowed sm:w-auto"
              >
                {isSending ? 'Sending...' : 'Invite'}
              </Button>
            </div>
          </div>
        </Form>
      </Box>
    </div>
  );
}
