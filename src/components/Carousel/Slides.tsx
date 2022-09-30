import Box from "@mui/material/Box";

import { slideLeft, slideRight } from "#/services/mui/keyframes";

import Graphic from "#/components/Graphic";

import { EntityPicture } from "#/utils/types/entity";
import { SlideEffect } from "#/utils/types/carousel";

interface SlidesProps {
  effect: SlideEffect;
  pictures: EntityPicture[];
}

function Slides({ effect, pictures }: SlidesProps) {
  /**
   * Define content during renders to enforce triggering
   * animation on every change.
   */
  // eslint-disable-next-line react/no-unstable-nested-components
  function Content() {
    return (
      <>
        {pictures.map(({ url, description }) => (
          <Graphic
            key={url}
            src={url}
            alt={description}
            width="100%"
            sx={{
              flexShrink: 0,
              ...(effect === SlideEffect.Left && {
                animation: `${slideLeft} ease 1500ms both`,
              }),
              ...(effect === SlideEffect.Right && {
                animation: `${slideRight} ease 1500ms both`,
              }),
            }}
          />
        ))}
      </>
    );
  }

  return (
    <Box sx={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <Content />
    </Box>
  );
}

export default Slides;
