'use client';

import React, { useState } from 'react';
import Box from '@/design-system/primitives/Box';
import Text from '@/design-system/primitives/Text';
import TextInput from '@/design-system/primitives/TextInput';
import Button from '@/design-system/primitives/Button';
import { apiCreateAuthor, type BasicUser } from '@/lib/api/users';

// Same pattern the backend's z.email() checks, so anything that passes here
// is accepted when the author is created.
const EMAIL_PATTERN =
  /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;

type NewAuthorInputProps = {
  /** Called with the new author once their account exists */
  onCreated: (author: BasicUser) => void;
};

/**
 * Optional section of the article form for an author who isn't in the
 * list yet. Makes them an account (and emails them an invite to finish
 * signing up) so they can be credited on this article right away.
 *
 * Its inputs aren't registered with the article form, and Enter adds the
 * author instead of submitting the article.
 */
export function NewAuthorInput({ onCreated }: NewAuthorInputProps) {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const trimmed = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
  };
  const isEmailValid = EMAIL_PATTERN.test(trimmed.email);
  const showEmailHint = trimmed.email.length > 0 && !isEmailValid;
  const isComplete =
    trimmed.firstName.length > 0 && trimmed.lastName.length > 0 && isEmailValid;

  const addAuthor = async () => {
    if (!isComplete || isSaving) return;
    setIsSaving(true);
    setError(null);
    setNotice(null);

    try {
      const result = await apiCreateAuthor(trimmed);
      if (!result.ok) {
        setError(`Couldn't add the author: ${result.error}`);
        return;
      }

      const { name, email: authorEmail, invited } = result.data;
      onCreated({ name, email: authorEmail });
      setFirstName('');
      setLastName('');
      setEmail('');
      setOpen(false);
      setNotice(
        invited
          ? `Added ${name} and emailed them an invite to finish signing up.`
          : `Added ${name}, but the invite email didn't send. An admin can resend it from Invite User.`,
      );
    } catch {
      setError("Couldn't add the author. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addAuthor();
    }
  };

  if (!open) {
    return (
      <Box className="mt-2 flex flex-col gap-1">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="self-start text-sm text-forest-green underline underline-offset-2 hover:opacity-80"
        >
          Author not listed? Add a new author
        </button>
        {notice && (
          <Text size={14} color="forest-green">
            {notice}
          </Text>
        )}
      </Box>
    );
  }

  return (
    <Box className="mt-3 flex flex-col gap-3 rounded-xl border-2 border-forest-green/20 bg-forest-green/5 p-4">
      <Box className="flex items-start justify-between gap-4">
        <Box className="flex flex-col gap-1">
          <Text size={16} style="bold" color="black">
            Add a new author
          </Text>
          <Text size={14} color="black" className="opacity-70">
            For someone without an account. They&apos;ll be added to this
            article and emailed an invite to finish signing up.
          </Text>
        </Box>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setError(null);
          }}
          className="shrink-0 text-sm text-black/60 underline underline-offset-2 hover:text-black"
        >
          Cancel
        </button>
      </Box>

      <Box className="grid grid-cols-1 gap-3 laptop:grid-cols-2">
        <TextInput
          label="First name"
          value={firstName}
          onChange={setFirstName}
          onKeyDown={onKeyDown}
          placeholder="First name"
          className="w-full"
          disabled={isSaving}
        />
        <TextInput
          label="Last name"
          value={lastName}
          onChange={setLastName}
          onKeyDown={onKeyDown}
          placeholder="Last name"
          className="w-full"
          disabled={isSaving}
        />
      </Box>
      <TextInput
        label="Email"
        value={email}
        onChange={setEmail}
        onKeyDown={onKeyDown}
        placeholder="name@northeastern.edu"
        className="w-full"
        disabled={isSaving}
      />
      {showEmailHint && (
        <Text size={14} color="red">
          Enter a valid email address.
        </Text>
      )}

      <Button
        type="button"
        onClick={addAuthor}
        color={isComplete ? 'forest-green' : 'border'}
        disabled={!isComplete || isSaving}
        className="self-start"
      >
        {isSaving ? 'Adding...' : 'Add author'}
      </Button>

      {error && (
        <Text size={14} color="red">
          {error}
        </Text>
      )}
      {notice && (
        <Text size={14} color="forest-green">
          {notice}
        </Text>
      )}
    </Box>
  );
}
