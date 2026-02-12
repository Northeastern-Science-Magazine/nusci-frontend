'use client';

import Link from 'next/link';

export default function InvalidInvitePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-12 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {/* Error Icon */}
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6">
              <svg
                className="h-12 w-12 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Invalid Invitation Link
            </h2>

            {/* Description */}
            <div className="space-y-3 text-gray-600 mb-8">
              <p>
                This invitation link is no longer valid. This could be because:
              </p>
              <ul className="text-sm text-left space-y-2 max-w-sm mx-auto">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>The link has already been used to create an account</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>The invitation has expired</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>The link was incorrectly copied or is incomplete</span>
                </li>
              </ul>
            </div>

            {/* Call to Action */}
            <div className="space-y-4">
              <div className="text-sm text-gray-700 bg-gray-50 rounded-md p-4">
                <p className="font-medium mb-1">Need a new invitation?</p>
                <p className="text-gray-600">
                  Please contact your team administrator to request a new invitation link.
                </p>
              </div>

              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
                <Link
                  href="/"
                  className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Go to Homepage
                </Link>
                <Link
                  href="/auth/login"
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign In
                </Link>
              </div>
            </div>

            {/* Support Contact */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Having trouble?{' '}
                <a
                  href="mailto:support@example.com"
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}