import Image from "next/image";
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
  type RenderSlideProps,
} from "yet-another-react-lightbox";

export function NextJsImage({ slide, offset, rect }: RenderSlideProps) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  if (
    !isImageSlide(slide) ||
    typeof slide.width !== "number" ||
    typeof slide.height !== "number"
  ) {
    return null;
  }

  const cover = isImageFitCover(slide, imageFit);

  const width = cover
    ? rect.width
    : Math.min(rect.width, (rect.height / slide.height) * slide.width);

  const height = cover
    ? rect.height
    : Math.min(rect.height, (rect.width / slide.width) * slide.height);

  return (
    <div style={{ height, position: "relative", width }}>
      <Image
        alt={slide.alt ?? ""}
        draggable={false}
        fill
        loading="eager"
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
        sizes="100vw"
        src={slide.src}
        style={{
          cursor: click ? "pointer" : undefined,
          objectFit: cover ? "cover" : "contain",
        }}
      />
    </div>
  );
}
