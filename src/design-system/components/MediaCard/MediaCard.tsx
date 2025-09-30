import { MediaCardProps, mediaCardVariants, ImageMediaCardProps, VideoMediaCardProps } from "./variants";
import Box from "@/primitives/Box";
import Image from "@/primitives/Image";
import Video from "@/primitives/Video";
import Text from "@/primitives/Text"
import { mediaCardTextSizes  } from "./variants";
import Card from "@/primitives/Card";

export const MediaCard = (props: MediaCardProps) => {
  const { title, subtitle, description, mediaDirection, mediaType, size, rounded, ...boxProps } = props;

  // Get text sizes from the configuration
  const textSizes = size ? mediaCardTextSizes[size] : mediaCardTextSizes.md;

  const Container = rounded === "rounded" ? Card : Box;

  // compute aspect ratio depending on layout and size
  const getRatio = () => {
    // vertical layouts use widescreen
    if (mediaDirection === "top" || mediaDirection === "bottom") return 16 / 9;
    // horizontal: sm=1:1, md=4:3, lg=16:9
    switch (size) {
      case "sm":
        return 1; // square
      case "md":
        return 4 / 3;
      case "lg":
      default:
        return 16 / 9;
    }
  };

  const ratio = getRatio();

  return (
    <Container {...boxProps} className={mediaCardVariants({ mediaDirection, size })}>
      {/* Content Section */}
      <div className="flex-1 p-4">
        {title && <Text size={textSizes.title}>{title}</Text>}
        {subtitle && <Text size={textSizes.subtitle} style="bold">{subtitle}</Text>}
        {description && <Text size={textSizes.description}>{description}</Text>}
      </div>

      {/* Media Section */}
        <div className="media-container flex-shrink-0">
        {props.mediaType === "image" && <Image {...props.imageProps} width="w-auto h-full object-cover" ratio={1} />}
        {props.mediaType === "video" && <Video {...props.videoProps} width="w-auto h-full object-cover" ratio={1}  />}
      </div>
    </Container>
  );
};
