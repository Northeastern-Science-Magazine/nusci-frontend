import { MediaCardProps, mediaCardVariants } from "./variants";
import Box from "@/primitives/Box";
import Image from "@/primitives/Image";
import Video from "@/primitives/Video";
import Text from "@/primitives/Text";
import { mediaCardTextSizes } from "./variants";

export const MediaCard = (props: MediaCardProps) => {
  const {
    title,
    subtitle,
    description,
    mediaType,
    size,
    color,
    children,
    ...variantProps
  } = props;

  // Get text sizes from the configuration
  const textSizes = mediaCardTextSizes[size ?? "md"];

  return (
    <Box
      color={color}
      className={mediaCardVariants(props)}
    >
      <Box className="flex-1" p={4} pt={8} pb={8}>
        {subtitle && (
          <Text size={textSizes.subtitle} className="font-light text-inherit">
            {subtitle}
          </Text>
        )}
        {title && (
          <Text size={textSizes.title} className="font-semibold text-inherit">
            {title}
          </Text>
        )}
        {description && (
          <Text size={textSizes.description} className="text-inherit">
            {description}
          </Text>
        )}
        {children}
      </Box>
      <Box className="media-container flex-shrink-0">
        {props.mediaType === "image" && (
          <Image {...props.imageProps} width="w-full h-full object-cover" />
        )}
        {props.mediaType === "video" && (
          <Video {...props.videoProps} width="w-full h-full object-cover" />
        )}
      </Box>
    </Box>
  );
};