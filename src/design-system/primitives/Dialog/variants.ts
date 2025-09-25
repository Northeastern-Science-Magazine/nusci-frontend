import { Dialog } from "./Dialog"
import { tv, type VariantProps } from "tailwind-variants";

// add overlay, content variants
export const dialogVariants = tv({
    base: "rounded-lg shadow-lg p-4",
    variants: {
        color: {
            blue: "bg-blue-500 text-white",
            red: "bg-red-500 text-white"
        }
    },
    defaultVariants: {
        color: "blue",
    }
})


export type DialogVariants = VariantProps<typeof dialogVariants>;

export interface DialogProps extends DialogVariants {
    open: boolean;
    onOpenChange: (open: boolean) => void; 
    trigger?: React.ReactNode;
    size?: "sm" | "md" | "lg";
    title?: React.ReactNode;
    description?: React.ReactNode;
    showClose?: boolean;
    footer?: React.ReactNode;
    children?: React.ReactNode;
};