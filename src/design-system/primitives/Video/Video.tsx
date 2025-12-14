import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { VideoProps, videoVariants } from "./variants";

/**
 * Video component.
 *
 * Use boolean prop `raw` to render a video without
 * Radix Aspect Ratio.
 *
 * @param {VideoProps} props
 * @returns Video Component
 */
export const Video = ({ ratio, src, poster, width, raw = false, ...props }: VideoProps) => {
  const video = <video src={src} poster={poster} className={videoVariants(props)} {...props} />;

  return raw ? (
    video
  ) : (
    <div className={width}>
      <AspectRatio.Root ratio={ratio}>{video}</AspectRatio.Root>
    </div>
  );
};
