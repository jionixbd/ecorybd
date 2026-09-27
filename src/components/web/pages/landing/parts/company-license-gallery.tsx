"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { NextJsImage } from "@/components/web/pages/layout/nextjs-image";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import { useState } from "react";
import { Masonry } from "react-plock";
import Lightbox from "yet-another-react-lightbox";

const photos = [
  {
    alt: "ISO Certificate",
    height: 424,
    src: "/images/ISO-certificate-opt.webp",
    width: 600,
  },
  {
    alt: "GMP Certificate",
    height: 424,
    src: "/images/GMP-certificate-opt.webp",
    width: 600,
  },
  {
    alt: "Certificate",
    height: 500,
    src: "/images/certificate-web-opt.webp",
    width: 500,
  },
  {
    alt: "Lab Test",
    height: 450,
    src: "/images/lab-test-opt.webp",
    width: 600,
  },
  {
    alt: "BSTI Certificate",
    height: 402,
    src: "/images/BSTI-certificate-opt.webp",
    width: 600,
  },
];

export const CompanyLicenseGallery = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const isMobile = useIsMobile();

  const renderPhoto = (photo: (typeof photos)[number], index: number) => (
    <button
      className="block w-full cursor-pointer"
      key={photo.src}
      onClick={() => setActiveIndex(index)}
      type="button"
    >
      <Image
        alt={photo.alt}
        className="rounded-2xl"
        height={photo.height}
        src={photo.src}
        style={{ height: "auto", width: "100%" }}
        width={photo.width}
      />
    </button>
  );

  if (isMobile) {
    return (
      <Carousel className="w-full">
        <CarouselContent>
          {photos.map((photo, index) => (
            <CarouselItem key={photo.src}>
              {renderPhoto(photo, index)}
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
          columns: [3, 3],
          gap: [16, 16],
          media: [1024],
        }}
        items={photos}
        render={renderPhoto}
      />

      <Lightbox
        close={() => setActiveIndex(-1)}
        index={activeIndex}
        open={activeIndex >= 0}
        render={{ slide: NextJsImage }}
        slides={photos}
      />
    </>
  );
};
