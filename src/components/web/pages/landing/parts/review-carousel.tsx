"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const reviews = [
  {
    height: 540,
    url: "/images/rocky-khan-opt.webp",
    width: 540,
  },
  {
    height: 540,
    url: "/images/abdullah-rana-opt.webp",
    width: 540,
  },
  {
    height: 540,
    url: "/images/banty-review-opt.webp",
    width: 540,
  },
  {
    height: 540,
    url: "/images/basahr-review-opt.webp",
    width: 540,
  },
  {
    height: 540,
    url: "/images/farauk-review-opt.webp",
    width: 540,
  },
  {
    height: 540,
    url: "/images/afjal-review-opt.webp",
    width: 540,
  },
];

export const ReviewCarousel = () => (
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
      {reviews.map((review, idx) => (
        <CarouselItem
          className="flex basis-5/5 overflow-hidden pl-0 sm:basis-2/3 md:basis-1/3 lg:basis-1/4"
          key={idx}
        >
          <Image
            alt="image"
            height={review.height}
            src={review.url}
            width={review.width}
          />
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
);
