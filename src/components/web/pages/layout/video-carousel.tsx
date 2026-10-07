"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  type VideoCarouselSlide,
  renderVideoCarouselSlide,
} from "@/components/web/pages/layout/video-carousel-slide";
import { cn } from "cn";
import Autoplay from "embla-carousel-autoplay";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface VideoCarouselProps {
  layout?: "full" | "container";
  videos: VideoCarouselSlide[];
}

export const VideoCarousel = ({
  videos,
  layout = "container",
}: VideoCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const renderThumbnail = (video: VideoCarouselSlide, index: number) => (
    <button
      className="relative flex w-full cursor-pointer items-center justify-center"
      key={video.youtubeId}
      onClick={() => setActiveIndex(index)}
      type="button"
    >
      <Image
        alt={video.alt ?? "Video thumbnail"}
        className={cn({
          "rounded-2xl": layout === "container",
        })}
        height={video.height}
        src={video.poster}
        style={{ height: "auto", width: "100%" }}
        width={video.width}
      />

      <div className="absolute z-10 flex size-16 items-center justify-center rounded-full bg-web-secondary/50">
        <Play className="size-8 text-web-muted" />
      </div>
    </button>
  );

  return (
    <>
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent className="px-4">
          {videos.map((video, index) => (
            <CarouselItem
              className={cn({
                "flex basis-3/3 overflow-hidden pl-4 sm:basis-2/3 md:basis-1/3":
                  layout === "container",
                "flex basis-5/5 overflow-hidden pl-0 sm:basis-2/3 md:basis-1/3 lg:basis-1/4":
                  layout === "full",
              })}
              key={video.youtubeId}
            >
              {renderThumbnail(video, index)}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Lightbox
        close={() => setActiveIndex(-1)}
        index={activeIndex}
        open={activeIndex >= 0}
        render={{ slide: renderVideoCarouselSlide }}
        slides={videos}
      />
    </>
  );
};
