import Container from "@mui/material/Container";

import Root from "./Root";
import Graphic from "#/components/layout/Graphic";

import type { EntityPicture } from "#/utils/types/entity";

import { ReactComponent as Logo } from "#/assets/images/logo.svg";

const PRIMARY_COLOR = "#00BBF0";

interface CarouselProps {
  pictures: EntityPicture[];
}

function Carousel({ pictures }: CarouselProps) {
  if (pictures.length === 0) {
    return (
      <Container
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 0,
        }}
      >
        <Logo width="52%" stroke={PRIMARY_COLOR} />
      </Container>
    );
  }

  if (pictures.length === 1) {
    const [{ url, description }] = pictures;

    return <Graphic src={url} alt={description} height="100%" width="100%" />;
  }

  return <Root pictures={pictures} />;
}

export default Carousel;
