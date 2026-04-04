import * as React from "react";
import * as RDialog from "@radix-ui/react-dialog";

import { DialogProps, DialogTriggerProps, DialogWindowProps, dialogWindowVariantsCN } from "./variants";
import clsx from "clsx";
import Icon from "../Icon";
import Box from "../Box";

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

export function DialogWindow({
  children,
  className,
  showCloseButton = true,
  preventDismiss = false,
  ...variantProps
}: DialogWindowProps) {
  return (
    <RDialog.Portal>
      <Box animation="fadeIn" duration={200}>
        <RDialog.Overlay className="fixed inset-0 bg-black/50" />
        <RDialog.Content
          className={clsx(dialogWindowVariantsCN(variantProps), className)}
          onPointerDownOutside={preventDismiss ? (e) => e.preventDefault() : undefined}
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
      </Box>
    </RDialog.Portal>
  );
}
