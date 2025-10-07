import { tv, type VariantProps } from "tailwind-variants";

export const dialogVariants = tv({
    base: "fixed bg-white dark:bg-neutral-900 outline-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    variants: {
        size: {
            sm: "w-[20rem] p-4",
            md: "w-[32rem] p-6",
            lg: "w-[44rem] p-8",
        },
        color: {
            blue: "bg-blue-50 text-blue-900 border border-blue-300",
            neutral: "bg-white text-neutral-900",
            red: "bg-red-50 text-red-900 border border-red-300",
            green: "bg-green-50 text-green-900 border border-green-300",
        }
    },
    defaultVariants: {
        size: "md",
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