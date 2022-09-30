import Box from "@mui/material/Box";

import Root from "./Root";
import Graphic from "#/components/Graphic";

import type { EntityPicture } from "#/utils/types/entity";

import NO_IMAGE_PATH from "#/assets/images/no-image.png";

interface CarouselProps {
  pictures: EntityPicture[];
}

function Carousel({ pictures }: CarouselProps) {
  if (pictures.length === 0) {
    return (
      <Box
        component="figure"
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "common.white",
        }}
      >
        <Graphic
          src={NO_IMAGE_PATH}
          alt="未提供圖片"
          height="80%"
          objectFit="contain"
        />
      </Box>
    );
  }

  if (pictures.length === 1) {
    const [{ url, description }] = pictures;

    return <Graphic src={url} alt={description} height="100%" width="100%" />;
  }

  return <Root pictures={pictures} />;
}

export default Carousel;
