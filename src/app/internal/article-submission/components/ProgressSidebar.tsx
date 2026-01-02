"use client";

import React, { useState } from "react";
import Text from "@/design-system/primitives/Text";
import { ProgressBar } from "@/design-system/primitives/ProgressBar";

type FormProgress = {
  author: boolean;
  title: boolean;
  categories: boolean;
  content: boolean;
  pullQuote: boolean;
  sources: boolean;
};

const ProgressCircle = ({
  filled,
  label,
  href,
}: {
  filled: boolean;
  label: string;
  href: string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`h-8 w-8 rounded-full border-2 transition-all duration-300 ${
          filled
            ? "border-sage-green bg-sage-green"
            : "border-gray-300 bg-white"
        }`}
      >
        {filled && (
          <svg
            className="h-full w-full p-1 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <a href={href}>
        <Text
          color={filled ? "sage-green" : "neutral"}
          size={14}
          style={filled ? "bold" : "regular"}
        >
          {label}
        </Text>
      </a>
    </div>
  );
};

export const ProgressSidebar = ({ progress }: { progress: FormProgress }) => {
  const totalFields = Object.keys(progress).length;
  const completedFields = Object.values(progress).filter(Boolean).length;
  const progressPercentage = Math.round((completedFields / totalFields) * 100);

  return (
    <div className="pb-4">
      <Text color="sage-green" size={20} style="bold" className="mb-4">
        Progress
      </Text>

      <div className="mb-6">
        <div className="mb-2 flex justify-between">
          <Text color="neutral" size={12}>
            {completedFields} of {totalFields} completed
          </Text>
        </div>
        <ProgressBar percentComplete={progressPercentage} color="sage-green" />
      </div>

      <div className="space-y-4">
        <ProgressCircle
          filled={progress.author}
          label="Author"
          href="#author"
        />
        <ProgressCircle filled={progress.title} label="Title" href="#title" />
        <ProgressCircle
          filled={progress.categories}
          label="Categories"
          href="#categories"
        />
        <ProgressCircle
          filled={progress.content}
          label="Content"
          href="#content"
        />
        <ProgressCircle
          filled={progress.pullQuote}
          label="Pull Quote"
          href="#pull-quote"
        />
        <ProgressCircle
          filled={progress.sources}
          label="Sources"
          href="#sources"
        />
      </div>
    </div>
  );
};
