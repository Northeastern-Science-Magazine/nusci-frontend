'use client';

import { useEffect, useRef, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { Form, FormField } from '@/primitives/Form';
import { SubmitHandler } from 'react-hook-form';
import MediaCard from '@/design-system/components/MediaCard';
import TextInput from '@/primitives/TextInput';
import Button from '@/primitives/Button';
import Box from '@/primitives/Box';
import Text from '@/primitives/Text';
import { Flex } from '@/primitives/Flex';
import { apiGetInvite, apiSignup } from '@/lib/api/users';

type SignUpFormValues = {
  firstName: string;
  lastName: string;
  graduationYear: string;
  password: string;
};

type PageState = 'loading' | 'ready' | 'error';

export default function SignUpPage() {
  const router = useRouter();
  // Invite token is kept in memory only; never logged or stored.
  const tokenRef = useRef<string | null>(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [pageState, setPageState] = useState<PageState>('loading');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate the invite from /signup?token=...
  useEffect(() => {
    // Strict mode runs effects twice, and the first run already removed the token from the URL.
    if (tokenRef.current !== null) return;

    const token = new URLSearchParams(window.location.search).get('token');
    tokenRef.current = token ?? '';
    // Remove the token from the URL so it doesn't leak via history or Referer.
    window.history.replaceState(null, '', window.location.pathname);

    if (!token) {
      setPageState('error');
      return;
    }

    // Safe to call on every load; it does not use up the invite.
    apiGetInvite(token)
      .then((result) => {
        if (result.ok) {
          setInviteEmail(result.data.email);
          setPageState('ready');
        } else {
          setPageState('error');
        }
      })
      .catch(() => setPageState('error'));
  }, []);

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await apiSignup({
        token: tokenRef.current ?? '',
        password: data.password,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        // Backend requires a number, but inputs give strings.
        graduationYear: Number(data.graduationYear),
      });

      if (result.ok) {
        // Login cookie is already set by the signup response.
        router.push('/');
      } else {
        setPageState('error');
      }
    } catch {
      setPageState('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (pageState === 'error') {
    notFound();
  }

  if (pageState === 'loading') {
    return (
      <Flex className="min-h-screen items-center justify-center p-4 bg-sage-green">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-forest-green mb-4"></div>
          <Text color="forest-green">Validating your invitation...</Text>
        </div>
      </Flex>
    );
  }

  return (
    <Flex className="min-h-screen items-center justify-center p-4 bg-sage-green">
      <MediaCard
        mediaType="image"
        mediaDirection="left"
        imageProps={{
          src: 'https://media.istockphoto.com/id/488961976/photo/exploding-nebula.jpg?s=612x612&w=0&k=20&c=QEfXvnU0ckq0SWNEXTzZnzUpjBDwmweU3a8VoIcBveA=',
          alt: 'signup',
        }}
        size="lg"
        rounded="rounded"
        className="max-w-7xl w-full [&_.media-container]:flex-1 bg-white"
      >
        <Text size={48} style="bold" color="forest-green" className="p-5 pb-0">
          Join NU Sci!
        </Text>
        <Form<SignUpFormValues>
          onSubmit={onSubmit}
          options={{
            defaultValues: {
              firstName: '',
              lastName: '',
              graduationYear: '',
              password: '',
            },
          }}
          className="space-y-6 mt-6 p-5"
        >
          {/* Email comes from the invite and cannot be changed */}
          <TextInput
            variant="outline"
            size="md"
            color="black"
            label="Email"
            value={inviteEmail}
            className="w-full"
            disabled
          />

          <FormField<SignUpFormValues>
            name="firstName"
            rules={{
              required: 'First name is required',
              validate: (value) =>
                value.trim().length > 0 || 'First name is required',
            }}
          >
            <TextInput
              variant="outline"
              size="md"
              color="black"
              label="First Name"
              placeholder="Enter your first name"
              className="w-full"
            />
          </FormField>

          <FormField<SignUpFormValues>
            name="lastName"
            rules={{
              required: 'Last name is required',
              validate: (value) =>
                value.trim().length > 0 || 'Last name is required',
            }}
          >
            <TextInput
              variant="outline"
              size="md"
              color="black"
              label="Last Name"
              placeholder="Enter your last name"
              className="w-full"
            />
          </FormField>

          <FormField<SignUpFormValues>
            name="graduationYear"
            rules={{
              required: 'Graduation year is required',
              validate: (value) => {
                const currentYear = new Date().getFullYear();
                const minYear = currentYear;
                const maxYear = currentYear + 6; // Adjust range as needed

                // Check if it's 4 digits
                if (!/^\d{4}$/.test(value)) {
                  return 'Year must be 4 digits';
                }

                // Check if it's in valid range
                const year = parseInt(value);
                if (year < minYear || year > maxYear) {
                  return `Year must be between ${minYear} and ${maxYear}`;
                }

                return true;
              },
            }}
          >
            <TextInput
              variant="outline"
              size="md"
              color="black"
              label="Graduation Year"
              placeholder="e.g., 2027"
              className="w-full"
            />
          </FormField>

          <FormField<SignUpFormValues>
            name="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            }}
          >
            <TextInput
              variant="outline"
              size="md"
              color="black"
              label="Password"
              placeholder="Create a password"
              className="w-full"
              type="password"
            />
          </FormField>

          <Button
            variant="default"
            size="md"
            color="forest-green"
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </Button>

          <Box className="text-left">
            <Text size={12} color="sage-green">
              Already have an account?{' '}
              <a href="/login" className="underline">
                Log in
              </a>
            </Text>
          </Box>
        </Form>
      </MediaCard>
    </Flex>
  );
}
