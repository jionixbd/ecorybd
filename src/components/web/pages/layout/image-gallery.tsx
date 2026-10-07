"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ImageGallerySlide as NextImageGallerySlide } from "@/components/web/pages/layout/image-gallery-slide";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import { useState } from "react";
import { Masonry } from "react-plock";
import Lightbox from "yet-another-react-lightbox";

interface ImageGallerySlide {
  alt: string;
  height: number;
  src: string;
  width: number;
}

interface ImageGalleryProps {
  carousel?: boolean;
  images: ImageGallerySlide[];
}

export const ImageGallery = ({
  images,
  carousel = true,
}: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const isMobile = useIsMobile();

  const renderPhoto = (image: ImageGallerySlide, index: number) => (
    <button
      className="block w-full cursor-pointer"
      key={image.src}
      onClick={() => setActiveIndex(index)}
      type="button"
    >
      <Image
        alt={image.alt}
        className="rounded-2xl"
        height={image.height}
        src={image.src}
        style={{ height: "auto", width: "100%" }}
        width={image.width}
      />
    </button>
  );

  if (isMobile && carousel) {
    return (
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={image.src}>
              {renderPhoto(image, index)}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }

  return (
    <>
      <Masonry
        config={{
          columns: [2, 3],
          gap: [16, 16],
          media: [768, 1024],
        }}
        items={images}
        render={renderPhoto}
      />

      <Lightbox
        close={() => setActiveIndex(-1)}
        index={activeIndex}
        open={activeIndex >= 0}
        render={{ slide: NextImageGallerySlide }}
        slides={images}
      />
    </>
  );
};
