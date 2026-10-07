"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "cn";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export interface ImageCarouselItem {
  height: number;
  url: string;
  width: number;
}

export interface ImageCarouselProps {
  items: ImageCarouselItem[];
  layout?: "full" | "container";
}

export const ImageCarousel = ({
  items,
  layout = "full",
}: ImageCarouselProps) => (
  <Carousel
    opts={{
      align: "start",
      loop: true,
    }}
    plugins={[
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]}
  >
    <CarouselContent className="ml-0">
      {items.map((item, idx) => (
        <CarouselItem
          className={cn({
            "flex basis-3/3 overflow-hidden pl-4 sm:basis-2/3 md:basis-1/3":
              layout === "container",
            "flex basis-5/5 overflow-hidden pl-0 sm:basis-2/3 md:basis-1/3 lg:basis-1/4":
              layout === "full",
          })}
          key={idx}
        >
          <Image
            alt="image"
            className={cn({
              "rounded-2xl": layout === "container",
            })}
            height={item.height}
            src={item.url}
            width={item.width}
          />
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
);
