import { useState, useCallback, useEffect, useRef } from "react";
import Container from "@mui/material/Container";

import Slides from "./Slides";
import Controllers from "./Controllers";
import Indicators from "./Indicators";

import { EntityPicture } from "#/utils/types/entity";
import { SlideEffect } from "#/utils/types/carousel";

interface RootProps {
  pictures: EntityPicture[];
}

function Root({ pictures: initPictures }: RootProps) {
  const [pictures, setPictures] = useState(initPictures);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [effect, setEffect] = useState(SlideEffect.Unset);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slidePrev = useCallback(() => {
    setEffect(SlideEffect.Right);
    setCurrentIndex((prev) => (prev === 0 ? pictures.length - 1 : prev - 1));

    if (effect !== SlideEffect.Left) {
      setPictures((prev) => [...prev.slice(-1), ...prev.slice(0, -1)]);
    }
  }, [pictures, effect]);

  const slideNext = useCallback(() => {
    setEffect(SlideEffect.Left);
    setCurrentIndex((prev) => (prev === pictures.length - 1 ? 0 : prev + 1));

    if (effect === SlideEffect.Left) {
      setPictures((prev) => [...prev.slice(1), prev[0]]);
    }
  }, [pictures, effect]);

  useEffect(() => {
    timerRef.current = setInterval(slideNext, 3000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timerRef, slideNext]);

  return (
    <Container sx={{ position: "relative", height: "100%", p: 0 }}>
      <Slides effect={effect} pictures={pictures} />
      <Controllers onPrev={slidePrev} onNext={slideNext} />
      <Indicators length={pictures.length} currentIndex={currentIndex} />
    </Container>
  );
}

export default Root;
