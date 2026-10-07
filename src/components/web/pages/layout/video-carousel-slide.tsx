import { YouTubeEmbed } from "@next/third-parties/google";
import type {
  ContainerRect,
  GenericSlide,
  RenderSlideProps,
  Slide,
} from "yet-another-react-lightbox";

export interface VideoCarouselSlide extends GenericSlide {
  alt?: string;
  height?: number;
  poster: string;
  width?: number;
  youtubeId: string;
}

declare module "yet-another-react-lightbox" {
  interface SlideTypes {
    SlideYoutube: VideoCarouselSlide;
  }
}

export const isYoutubeSlide = (slide: Slide): slide is VideoCarouselSlide =>
  "youtubeId" in slide;

export function VideoCarouselSlide({
  slide,
  rect,
}: {
  slide: VideoCarouselSlide;
  rect: ContainerRect;
}) {
  const videoWidth = slide.width ?? 1280;
  const videoHeight = slide.height ?? 720;

  const width = Math.min(rect.width, (rect.height / videoHeight) * videoWidth);
  const height = Math.min(rect.height, (rect.width / videoWidth) * videoHeight);

  return (
    <div
      className="flex items-center justify-center"
      style={{ height, margin: "0 auto", position: "relative", width }}
    >
      <div className="block w-full">
        <YouTubeEmbed
          params="controls=0"
          style="margin:0 auto; border-radius:16px;"
          videoid={slide.youtubeId}
        />
      </div>
    </div>
  );
}

export const renderVideoCarouselSlide = ({ slide, rect }: RenderSlideProps) =>
  isYoutubeSlide(slide) ? (
    <VideoCarouselSlide rect={rect} slide={slide} />
  ) : undefined;
