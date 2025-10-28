import * as React from "react";
import * as RDialog from "@radix-ui/react-dialog";

import { DialogProps, dialogVariants } from "./variants";
import Icon from "../Icon";

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

  const isTextBlack =
  color === "white" ||
  color === "red" ||
  color === "aqua-light" ||
  color === "sage-green" ||
  color === "border" ||
  color === "neutral";

  return (
    <RDialog.Root open={open} onOpenChange={onOpenChange}>
      {!open && trigger ? (
        <RDialog.Trigger asChild>{trigger}</RDialog.Trigger>
      ) : null}

      <RDialog.Portal>
        <RDialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
        <RDialog.Content className={dialogVariants({ size, color })}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}>
          {(title || showClose) && (
            <div className="flex items-start justify-between mb-4">
              {title && (
                <RDialog.Title className="text-lg font-semibold">
                  {title}
                </RDialog.Title>
              )}
              {showClose && (
                <RDialog.Close asChild>
                  <Icon
                    icon="cross"
                    className="absolute right-2.5 top-2.5"
                    onClick={() => onOpenChange(false)}
                    size="sm"
                    color={isTextBlack? "black" : "white"}/>
                </RDialog.Close>
              )}
            </div>
          )}
          {description && (
            <RDialog.Description className="mb-4 text-sm">
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
