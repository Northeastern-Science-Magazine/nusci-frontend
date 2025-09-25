import * as React from "react";
import * as RDialog from "@radix-ui/react-dialog";

import { DialogProps } from "./variants";
import { dialogVariants } from "./variants";

export const Dialog = ({
    open, 
    onOpenChange,
    trigger, 
    size = "md", 
    title, 
    description, 
    showClose = true, 
    footer, 
    children, 
}: DialogProps) => {
    if (!open) return null;

    return <RDialog.Root
        open={open} onOpenChange={onOpenChange}>
        {trigger ? 
            <RDialog.Trigger asChild>{trigger}</RDialog.Trigger> : null}

        <RDialog.Portal> 
            <RDialog.Overlay/> 

            <RDialog.Content>
                title, description, footer 
            </RDialog.Content>
        </RDialog.Portal>
        </RDialog.Root>
}
