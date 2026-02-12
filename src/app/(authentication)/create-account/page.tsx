'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { Form, FormField } from '@/design-system/primitives/Form';
import TextInput from '@/design-system/primitives/TextInput';
import Button from '@/design-system/primitives/Button';
import Box from '@/design-system/primitives/Box';
import Text from '@/design-system/primitives/Text';

type CreateAccountFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function CreateAccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get('token');

  const [isValidatingToken, setIsValidatingToken] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [inviteEmail, setInviteEmail] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Validate invite token 
  useEffect(() => {
    const validateToken = async () => {
      if (!inviteToken) {
        setIsValidatingToken(false);
        setIsTokenValid(false);
        return;
      }

      // Replace with actual API call for token validation
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (inviteToken.length >= 5) {
        setIsTokenValid(true);
      } else {
        setIsTokenValid(false);
        setTimeout(() => {
          router.push('/invalid-invite');
        }, 2000);
      }

      setIsValidatingToken(false);
    };

    validateToken();
  }, [inviteToken, router]);

  const onSubmit: SubmitHandler<CreateAccountFormValues> = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Replace with actual API call to create account
      console.log('Creating account with data:', {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        inviteToken,
      });

      await new Promise(resolve => setTimeout(resolve, 2000));

      // Alert for account successfully created
      alert('Account created successfully!');
      
      // Redirect to private profile (replace with actual path to private profile)
      router.push('/profile/private');

    } catch (error) {
      console.error('Error creating account:', error);
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state while validating token
  if (isValidatingToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-gray-600">Validating your invitation...</p>
        </div>
      </div>
    );
  }

  // Show error if token is invalid
  if (!isTokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Invitation</h1>
          <p className="text-gray-600 mb-4">
            This invitation link is invalid or has already been used.
          </p>
          <p className="text-sm text-gray-500">Redirecting you to the invalid invite page...</p>
        </div>
      </div>
    );
  }

  // Main create account form
  return (
    <div className="min-h-screen bg-sage-green flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Text size={30} style="bold" color="forest-green" className="p-5 pb-0 text-center">
          Create Your Account
        </Text>
        <p className="mt-2 text-center text-sm text-gray-600">
          Complete your account setup to get started
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white border-2 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form<CreateAccountFormValues>
            onSubmit={onSubmit}
            options={{
              defaultValues: {
                firstName: '',
                lastName: '',
                email: inviteEmail || '',
                password: '',
                confirmPassword: '',
              },
            }}
            className="space-y-6"
          >
            {/* General Error Message */}
            {submitError && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {submitError}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            {/* First Name */}
            <FormField<CreateAccountFormValues>
              name="firstName"
              rules={{
                required: 'First name is required',
                minLength: {
                  value: 2,
                  message: 'First name must be at least 2 characters',
                },
              }}
            >
              <TextInput
                label="First Name"
                placeholder="Enter your first name"
                className="w-full"
              />
            </FormField>

            {/* Last Name */}
            <FormField<CreateAccountFormValues>
              name="lastName"
              rules={{
                required: 'Last name is required',
                minLength: {
                  value: 2,
                  message: 'Last name must be at least 2 characters',
                },
              }}
            >
              <TextInput
                label="Last Name"
                placeholder="Enter your last name"
                className="w-full"
              />
            </FormField>

            {/* Email */}
            <FormField<CreateAccountFormValues>
              name="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
              }}
            >
              <TextInput
                label="Email Address"
                placeholder="name@example.com"
                className="w-full"
                disabled={!!inviteEmail}
              />
            </FormField>

            {/* Password */}
            <Box>
              <FormField<CreateAccountFormValues>
                name="password"
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  validate: (value) => {
                    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                      return 'Password must contain uppercase, lowercase, and numbers';
                    }
                    return true;
                  },
                }}
              >
                <TextInput
                  label="Password"
                  placeholder="Create a secure password"
                  className="w-full"
                  type="password"
                />
              </FormField>
              <p className="mt-2 text-xs text-gray-500">
                Must be at least 8 characters with uppercase, lowercase, and numbers
              </p>
            </Box>

            {/* Confirm Password */}
            <FormField<CreateAccountFormValues>
              name="confirmPassword"
              rules={{
                required: 'Please confirm your password',
                validate: (value, formValues) => {
                  if (value !== formValues.password) {
                    return 'Passwords do not match';
                  }
                  return true;
                },
              }}
            >
              <TextInput
                label="Confirm Password"
                placeholder="Re-enter your password"
                className="w-full"
                type="password"
              />
            </FormField>

            <Box>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="default"
                size="lg"
                color="forest-green"
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </Box>
          </Form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?{' '}
                  <a href="/login" className="font-medium text-forest-green hover:text-forest-green">
                    Sign in
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}