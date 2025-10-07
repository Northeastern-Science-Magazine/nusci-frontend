import * as React from "react";
import * as RDialog from "@radix-ui/react-dialog";

import { DialogProps, dialogVariants } from "./variants";
import { Cross2Icon } from "@radix-ui/react-icons";

export const Dialog = ({
  open,
  onOpenChange,
  trigger,
  size,
  color,
  title,
  description,
  showClose = true,
  footer,
  children,
}: DialogProps) => {
  return (
    <RDialog.Root open={open} onOpenChange={onOpenChange}>
      {!open && trigger ? (
        <RDialog.Trigger asChild>{trigger}</RDialog.Trigger>
      ) : null}

      <RDialog.Portal>
        <RDialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />

        <RDialog.Content className={dialogVariants({ size, color })}>
          {(title || showClose) && (
            <div className="flex items-start justify-between mb-4">
              {title && (
                <RDialog.Title className="text-lg font-semibold">
                  {title}
                </RDialog.Title>
              )}
              {showClose && (
                <RDialog.Close asChild>
                  <button
                    className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 bg-gray3 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
                    aria-label="Close"
                  >
                    <Cross2Icon />
                  </button>
                </RDialog.Close>
              )}
            </div>
          )}
          {description && (
            <RDialog.Description className="mb-4 text-sm text-gray-600">
              {description}
            </RDialog.Description>
          )}

          <div>{children}</div>

          {footer && (
            <div className="mt-6 flex justify-end gap-2">{footer}</div>
          )}
        </RDialog.Content>
      </RDialog.Portal>
    </RDialog.Root>
  );
};
