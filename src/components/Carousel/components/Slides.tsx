import Box from "@mui/material/Box";

import type { Picture } from "#/utils/models/base";
import Graphic from "#/components/Graphic";

import { slideLeft, slideRight, SlideEffect } from "../utils/keyframes";

export interface SlidesProps {
  effect: SlideEffect | "stable";
  pictures: Picture[];
}

export function Slides({ effect, pictures }: SlidesProps) {
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
              ...(effect === "slide-left" && {
                animation: `${slideLeft} ease 1500ms both`,
              }),
              ...(effect === "slide-right" && {
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
