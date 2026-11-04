import * as React from 'react';
import * as RDialog from '@radix-ui/react-dialog';

import {
  DialogProps,
  DialogTextProps,
  DialogTriggerProps,
  DialogWindowProps,
  dialogWindowVariantsCN,
} from './variants';
import clsx from 'clsx';
import Icon from '../Icon';

const FADE_IN = 'opacity-0 animate-fadeIn [animation-duration:200ms]';

export function Dialog({ children, open, onOpenChange }: DialogProps) {
  return (
    <RDialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </RDialog.Root>
  );
}

export function DialogTrigger({ children }: DialogTriggerProps) {
  return <RDialog.DialogTrigger asChild>{children}</RDialog.DialogTrigger>;
}

export function DialogTitle({ children, className }: DialogTextProps) {
  return <RDialog.Title className={className}>{children}</RDialog.Title>;
}

export function DialogDescription({ children, className }: DialogTextProps) {
  return (
    <RDialog.Description className={className}>{children}</RDialog.Description>
  );
}

export function DialogWindow({
  children,
  className,
  showCloseButton = true,
  preventDismiss = false,
  ...variantProps
}: DialogWindowProps) {
  return (
    <RDialog.Portal>
      {/* Fade lives on each layer: an opacity wrapper would trap z-50 below the header */}
      <RDialog.Overlay
        className={clsx('fixed inset-0 z-50 bg-black/50', FADE_IN)}
      />
      <RDialog.Content
        className={clsx(
          dialogWindowVariantsCN(variantProps),
          FADE_IN,
          className,
        )}
        onPointerDownOutside={
          preventDismiss ? (e) => e.preventDefault() : undefined
        }
        onEscapeKeyDown={preventDismiss ? (e) => e.preventDefault() : undefined}
      >
        {children}
        {showCloseButton && (
          <RDialog.Close asChild>
            {/* Need Button Close For Accessibility */}
            <Icon
              icon="x"
              size="lg"
              className="absolute right-2.5 top-2.5 inline-flex items-center justify-center rounded-full"
            />
          </RDialog.Close>
        )}
      </RDialog.Content>
    </RDialog.Portal>
  );
}
