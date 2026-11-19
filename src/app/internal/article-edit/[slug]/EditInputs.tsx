'use client';

import { Plus, Trash2 } from 'lucide-react';

import TextInput from '@/design-system/primitives/TextInput';
import Button from '@/design-system/primitives/Button';
import Text from '@/design-system/primitives/Text';

type EditPullQuoteInputProps = {
  value: string[];
  onChange: (quotes: string[]) => void;
  disabled?: boolean;
};

/**
 * Matches submission's pull-quote controls without forwarding
 * the unsupported multiline attribute to the HTML input.
 */
export function EditPullQuoteInput({
  value,
  onChange,
  disabled = false,
}: EditPullQuoteInputProps) {
  const quotes = value.length ? value : [''];

  return (
    <div className={`flex flex-col gap-3 ${disabled ? 'opacity-60' : ''}`}>
      <p className="text-sm font-medium text-black">Pull Quotes</p>

      {quotes.map((quote, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="flex-1">
            <TextInput
              label=""
              aria-label={`Pull quote ${index + 1}`}
              placeholder="Enter a pull quote"
              value={quote}
              disabled={disabled}
              className="w-full"
              onChange={(text) =>
                onChange(
                  quotes.map((existing, currentIndex) =>
                    currentIndex === index ? text : existing,
                  ),
                )
              }
            />
          </div>

          {quotes.length > 1 && (
            <button
              type="button"
              disabled={disabled}
              aria-label={`Remove pull quote ${index + 1}`}
              onClick={() =>
                onChange(
                  quotes.filter((_, currentIndex) => currentIndex !== index),
                )
              }
              className="shrink-0 rounded-md border border-red-600 p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        color="sage-green"
        disabled={disabled}
        className="flex w-full items-center justify-center gap-2"
        onClick={() => onChange([...quotes, ''])}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        <Text>Add Pull Quote</Text>
      </Button>
    </div>
  );
}
