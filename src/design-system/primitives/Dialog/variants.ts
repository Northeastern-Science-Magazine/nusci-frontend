import { tv, type VariantProps } from "tailwind-variants";

export const dialogVariants = tv({
    base: "fixed rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    variants: {
        size: {
            sm: "w-[20rem] p-4",
            md: "w-[32rem] p-6",
            lg: "w-[44rem] p-8",
        },
        color: {
            black: "bg-black text-white border border-black",
            white: "bg-white text-black border border-black",
            red: "bg-red-50 text-black border border-red-500",
            aqua: "bg-aqua text-white border border-aqua",
                "aqua-light": "bg-aqua-light text-black border border-aqua-light",
                "forest-green": "bg-forest-green text-white border border-forest-green",
                "sage-green": "bg-sage-green text-black border border-sage-green",
            border: "bg-border text-black border border-border",
            neutral: "bg-neutral text-black border border-neutral",
            purple: "bg-purple text-white border border-purple",
            pink: "bg-pink text-white border border-pink",
            maroon: "bg-maroon text-white border border-maroon",
            coral: "bg-coral text-white border border-coral",
            marigold: "bg-marigold text-white border border-marigold",
        }
    },
    defaultVariants: {
        size: "md",
        color: "black",
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