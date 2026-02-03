"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/primitives/Button";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            404
          </h1>
        </div>

        {/* Main Message */}
        <div className="mb-8">
          <p className="text-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Countdown Circle */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="60"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="60"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(countdown / 15) * 351.86} 351.86`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-linear"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9333ea" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs text-gray-500">Redirecting in </div>
                <div className="text-4xl font-bold text-gray-900">{countdown}</div>
                <div className="text-xs text-gray-500">seconds</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center">
        <Link href={"/"}>
          <Button>
            Go Home Now
          </Button>
        </Link>

        </div>
      </div>
    </main>
  );
}