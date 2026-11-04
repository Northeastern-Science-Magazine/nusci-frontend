'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogWindow,
} from '../../primitives/Dialog';
import Box from '../../primitives/Box';
import Button from '../../primitives/Button';
import Icon from '../../primitives/Icon';
import Text from '../../primitives/Text';
import { ConfirmDialogProps, confirmDialogVariants } from './variants';

/**
 * In-page replacement for window.confirm.
 *
 * @param { ConfirmDialogProps } props
 * @returns ConfirmDialog Component
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  pendingLabel,
  cancelLabel = 'Cancel',
  onConfirm,
  tone = 'default',
}: ConfirmDialogProps) {
  const [pending, setPending] = useState(false);
  const { badge } = confirmDialogVariants({ tone });
  const danger = tone === 'danger';

  const handleConfirm = async () => {
    setPending(true);
    try {
      await onConfirm();
    } finally {
      setPending(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !pending && onOpenChange(next)}>
      <DialogWindow
        size="sm"
        color="white"
        showCloseButton={false}
        preventDismiss={pending}
        className="p-6 laptop:p-8"
      >
        <Box className="flex items-start gap-4">
          <Box className={badge()}>
            <Icon
              icon={danger ? 'trash' : 'info'}
              size="lg"
              color={danger ? 'red' : 'forest-green'}
            />
          </Box>
          <Box className="flex flex-col gap-2 pt-1">
            <DialogTitle>
              <Text as="span" style="bold" size={20} color="black">
                {title}
              </Text>
            </DialogTitle>
            {description && (
              <DialogDescription>
                <Text
                  as="span"
                  size={14}
                  color="black"
                  className="leading-relaxed opacity-75"
                >
                  {description}
                </Text>
              </DialogDescription>
            )}
          </Box>
        </Box>

        <Box className="mt-8 flex flex-col-reverse gap-3 laptop:flex-row laptop:justify-end">
          <Button
            variant="outline"
            color="black"
            size="md"
            disabled={pending}
            onClick={() => onOpenChange(false)}
            className="disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelLabel}
          </Button>
          <Button
            variant="default"
            color={danger ? 'red' : 'forest-green'}
            size="md"
            disabled={pending}
            onClick={handleConfirm}
            className="disabled:cursor-not-allowed disabled:opacity-70"
          >
            {pending && pendingLabel ? pendingLabel : confirmLabel}
          </Button>
        </Box>
      </DialogWindow>
    </Dialog>
  );
}
