import type { Picture } from "#/utils/models/base";
import Graphic from "#/components/Graphic";
import NO_IMAGE_PATH from "#/assets/images/no-image.png";

import { Carousel } from "./Carousel";

interface CarouselWithFallbackProps {
  pictures: Picture[];
}

export function CarouselWithFallback({ pictures }: CarouselWithFallbackProps) {
  if (pictures.length === 0) {
    return (
      <Graphic
        src={NO_IMAGE_PATH}
        alt="未提供圖片"
        figureSx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "common.white",
        }}
        imageSx={{ height: "80%", objectFit: "contain" }}
      />
    );
  }

  if (pictures.length === 1) {
    const [{ url, description }] = pictures;

    return (
      <Graphic
        src={url}
        alt={description}
        figureSx={{ height: "100%", width: "100%" }}
      />
    );
  }

  return <Carousel pictures={pictures} />;
}
