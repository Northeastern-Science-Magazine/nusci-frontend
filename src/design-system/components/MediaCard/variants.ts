import { CardProps } from "../../primitives/Card/variants";
import { BoxProps } from "@/primitives/Box/variants"
import { ImageProps } from '../../primitives/Image/variants'
import { VideoProps } from '../../primitives/Video/variants'
import { tv, type VariantProps } from "tailwind-variants";

export const mediaCardVariants = tv({
    base: "flex gap-4",
    variants: {
        mediaDirection: {
            default: "flex-row",
            left: "flex-row-reverse", 
            top: "flex-col-reverse", 
            bottom: "flex-col",
        }, 
    //     size: {
    //   sm: "px-3 py-1.5 text-sm",
    //   md: "px-4 py-2 text-base",
    //   lg: "px-5 py-3 text-lg",
    // },
    },
    defaultVariants: {
        mediaDirection: "default"
    }
})

export type MediaCardVariants  = VariantProps<typeof mediaCardVariants>;

// Base props shared by all media cards
interface BaseMediaCardProps extends Omit<BoxProps, 'children'>, MediaCardVariants {
    title?: string;
    subtitle?: string;
    description?: string;
}

// Image-specific media card
export interface ImageMediaCardProps extends BaseMediaCardProps {
    mediaType: "image";
    imageProps: Omit<ImageProps, 'width'>;
    // imageProps: ImageProps;
}

// Video-specific media card  
export interface VideoMediaCardProps extends BaseMediaCardProps {
    mediaType: "video";
    videoProps: Omit<VideoProps, 'width'>;
    // videoProps: VideoProps;
}

// Union type for the component
export type MediaCardProps = ImageMediaCardProps | VideoMediaCardProps;