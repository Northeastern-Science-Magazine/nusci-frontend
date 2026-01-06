import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { VideoProps, videoVariantsCN } from "./variants";
import Box from "../Box";

/**
 * Video component.
 *
 * Use boolean prop `raw` to render a video without
 * Radix Aspect Ratio.
 *
 * @param {VideoProps} props
 * @returns Video Component
 */
export const Video = ({
  ratio,
  src,
  raw = false,
  controls,
  muted,
  autoPlay,
  loop,
  preload,
  poster,
  className,
  width,
  ...props
}: VideoProps) => {
  return raw ? (
    <video
      src={src}
      controls={controls}
      muted={muted}
      autoPlay={autoPlay}
      loop={loop}
      preload={preload}
      poster={poster}
      className={videoVariantsCN({ ...props, width }, className)}
    />
  ) : (
    <Box width={width}>
      <AspectRatio.Root ratio={ratio}>
        <video
          src={src}
          controls={controls}
          muted={muted}
          autoPlay={autoPlay}
          loop={loop}
          preload={preload}
          poster={poster}
          className={videoVariantsCN(props, className)}
        />
      </AspectRatio.Root>
    </Box>
  );
};
