'use client';

import { useState } from 'react';
import Text from '@/design-system/primitives/Text/Text';
import Card from '@/design-system/primitives/Card';
import { Box } from '@/design-system/primitives/Box/Box';
import { Form, FormField } from '@/design-system/primitives/Form';
import TextInput from '@/design-system/primitives/TextInput';
import Button from '@/design-system/primitives/Button';
import { apiChangePassword } from '@/lib/api/users';
import {
  newPasswordRules,
  PASSWORD_HINT,
  validatePasswordStrength,
} from '@/lib/helpers/password';

interface ChangePasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const EMPTY: ChangePasswordValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

/** Lets a logged-in user change their password from their private profile */
export default function ChangePasswordForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  // Bumped to remount the Form and clear the fields
  const [formKey, setFormKey] = useState(0);

  const close = () => {
    setIsOpen(false);
    setError(null);
    setFormKey((k) => k + 1);
  };

  const onSubmit = async (data: ChangePasswordValues) => {
    setSaving(true);
    setError(null);
    try {
      const response = await apiChangePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      if (!response.ok) {
        setError(response.error || "Couldn't change your password.");
        return;
      }
      close();
      setNotice('Your password was updated.');
    } catch {
      setError("Couldn't change your password. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box className="bg-gray">
      <Box className="max-w-6xl mx-auto px-4 laptop:px-8 pb-8">
        <Card color="white" className="shadow-xl p-8 w-full">
          <Box className="flex items-center justify-between gap-4 flex-wrap">
            <Box>
              <Text
                style="regular"
                size={14}
                color="sage-green"
                className="uppercase tracking-wide mb-1"
              >
                Password
              </Text>
              {notice && !isOpen && (
                <Text style="regular" size={16} color="forest-green">
                  {notice}
                </Text>
              )}
            </Box>
            {!isOpen && (
              <Button
                onClick={() => {
                  setNotice(null);
                  setIsOpen(true);
                }}
                variant="outline"
                color="black"
                size="md"
              >
                Change Password
              </Button>
            )}
          </Box>

          {isOpen && (
            <Form<ChangePasswordValues>
              key={formKey}
              onSubmit={onSubmit}
              options={{ defaultValues: EMPTY }}
              className="mt-4 flex flex-col gap-4 max-w-md"
            >
              <FormField<ChangePasswordValues>
                name="currentPassword"
                rules={{ required: 'Current password is required' }}
              >
                <TextInput
                  label="Current Password"
                  placeholder="Enter your current password"
                  type="password"
                  autoComplete="current-password"
                  className="w-full"
                />
              </FormField>

              <Box>
                <FormField<ChangePasswordValues>
                  name="newPassword"
                  rules={{
                    ...newPasswordRules<ChangePasswordValues>(),
                    validate: {
                      strength: validatePasswordStrength,
                      different: (value, formValues) =>
                        value !== formValues.currentPassword ||
                        'New password must be different from the current password',
                    },
                  }}
                >
                  <TextInput
                    label="New Password"
                    placeholder="Create a new password"
                    type="password"
                    autoComplete="new-password"
                    className="w-full"
                  />
                </FormField>
                <Text size={12} color="sage-green" className="mt-2">
                  {PASSWORD_HINT}
                </Text>
              </Box>

              <FormField<ChangePasswordValues>
                name="confirmPassword"
                rules={{
                  required: 'Please confirm your new password',
                  validate: (value, formValues) =>
                    value === formValues.newPassword ||
                    'Passwords do not match',
                }}
              >
                <TextInput
                  label="Confirm New Password"
                  placeholder="Re-enter your new password"
                  type="password"
                  autoComplete="new-password"
                  className="w-full"
                />
              </FormField>

              {error && (
                <Text style="regular" size={14} color="red">
                  {error}
                </Text>
              )}

              <Box className="flex gap-3">
                <Button
                  onClick={close}
                  variant="outline"
                  color="black"
                  size="md"
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  color="forest-green"
                  size="md"
                  disabled={saving}
                >
                  {saving ? 'Updating...' : 'Update Password'}
                </Button>
              </Box>
            </Form>
          )}
        </Card>
      </Box>
    </Box>
  );
}
