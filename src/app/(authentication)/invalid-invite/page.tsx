'use client';

import Link from 'next/link';
import Text from '@/design-system/primitives/Text';

export default function InvalidInvitePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-100 py-12 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Invalid Invitation Link
            </h2>

            {/* Description */}
            <div className="space-y-3 text-gray-600 mb-8">
              <Text>
                This invitation link is no longer valid. 
              </Text>
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
                  className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2"
                >
                  Go to Homepage
                </Link>
                <Link
                  href="/login"
                  className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}