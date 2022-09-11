import { useState, useCallback } from "react";
import Container from "@mui/material/Container";

import Slides from "./Slides";
import Controllers from "./Controllers";

import { EntityPicture } from "#/utils/types/entity";
import { SlideEffect } from "#/utils/types/carousel";

// TODO: Consider adding autoplay and indicators.
// TODO: The wording of duplicate variables.

interface CarouselProps {
  pictures: EntityPicture[];
}

function Carousel({ pictures: initPictures }: CarouselProps) {
  const [pictures, setPictures] = useState(initPictures);
  const [effect, setEffect] = useState(SlideEffect.Unset);

  const slidePrev = useCallback(() => {
    setEffect(SlideEffect.Right);

    if (effect !== SlideEffect.Left) {
      setPictures((prev) => [...prev.slice(-1), ...prev.slice(0, -1)]);
    }
  }, [effect]);

  const slideNext = useCallback(() => {
    setEffect(SlideEffect.Left);

    if (effect === SlideEffect.Left) {
      setPictures((prev) => [...prev.slice(1), prev[0]]);
    }
  }, [effect]);

  return (
    <Container sx={{ position: "relative", height: "100%", p: 0 }}>
      <Slides effect={effect} pictures={pictures} />
      <Controllers onPrev={slidePrev} onNext={slideNext} />
    </Container>
  );
}

export default Carousel;

// function Indicator() {}

// const lineup = useMemo(() => {
//   const prevItem =
//     position === 0 ? pictures[lastIndex] : pictures[position - 1];
//   const currentItem = pictures[position];
//   const nextItem =
//     position === lastIndex ? pictures[0] : pictures[position + 1];

//   return [prevItem, currentItem, nextItem];
// }, [pictures, position, lastIndex]);
