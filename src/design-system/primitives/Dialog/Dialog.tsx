import * as React from "react";
import * as RDialog from "@radix-ui/react-dialog";

import { DialogProps, DialogTriggerProps, DialogWindowProps, dialogWindowVariants } from "./variants";
import clsx from "clsx";
import Icon from "../Icon";

export function Dialog({ children }: DialogProps) {
  return <RDialog.Root>{children}</RDialog.Root>;
}

export function DialogTrigger({ children }: DialogTriggerProps) {
  return <RDialog.DialogTrigger asChild>{children}</RDialog.DialogTrigger>;
}

export function DialogWindow({ children, className, ...variantProps }: DialogWindowProps) {
  return (
    <RDialog.Portal>
      <RDialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
      <RDialog.Content className={clsx(dialogWindowVariants(variantProps), className)}>
        {children}
        <RDialog.Close asChild>
          {/* Need Button Close For Accessibility */}
          <Icon icon="x" size="lg" className="absolute right-2.5 top-2.5 inline-flex items-center justify-center rounded-full" />
        </RDialog.Close>
      </RDialog.Content>
    </RDialog.Portal>
  );
}
