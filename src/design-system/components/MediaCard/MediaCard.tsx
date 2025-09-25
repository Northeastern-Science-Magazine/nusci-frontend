import { MediaCardProps, mediaCardVariants } from "./variants";
import Box from "@/primitives/Box";
import Image from "@/primitives/Image";
import Video from "@/primitives/Video";
import Text from "@/primitives/Text"

export const MediaCard = (props: MediaCardProps) => {
  const { title, subtitle, description, mediaDirection, mediaType, ...boxProps } = props;

  return (
    <Box {...boxProps} className={mediaCardVariants({ mediaDirection })}>
      {/* Content Section */}
      <div className="flex-1 space-y-2">
        {title && <Text size={12} >{title}</Text>}
        {subtitle && <Text size={16} style="bold">{subtitle}</Text>}
        {description && <Text size={8}>{description}</Text>}
        
      </div>

      {/* Media Section */}
      <div className="flex-1 space-y-2">
        {props.mediaType === "image" && <Image {...props.imageProps} width="w-full h-full object-cover" />}
        {props.mediaType === "video" && <Video {...props.videoProps} width="w-full h-full object-cover" />}
      </div>
    </Box>
  );
};
