import { useState, useCallback, useEffect, useRef } from "react";
import Box from "@mui/material/Box";

import type { Picture } from "#/utils/models/base";

import { Slides, SlidesProps } from "./Slides";
import { Controllers } from "./Controllers";
import { Indicators } from "./Indicators";

interface CarouselProps {
  pictures: Picture[];
}

export function Carousel({ pictures: initialPictures }: CarouselProps) {
  const [pictures, setPictures] = useState(initialPictures);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [effect, setEffect] = useState<SlidesProps["effect"]>("stable");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slidePrev = useCallback(() => {
    setEffect("slide-right");
    setCurrentIndex((prev) => (prev === 0 ? pictures.length - 1 : prev - 1));

    if (effect !== "slide-left") {
      setPictures((prev) => [...prev.slice(-1), ...prev.slice(0, -1)]);
    }
  }, [pictures, effect]);

  const slideNext = useCallback(() => {
    setEffect("slide-left");
    setCurrentIndex((prev) => (prev === pictures.length - 1 ? 0 : prev + 1));

    if (effect === "slide-left") {
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
    <Box sx={{ position: "relative", height: "100%" }}>
      <Slides effect={effect} pictures={pictures} />
      <Controllers onPrev={slidePrev} onNext={slideNext} />
      <Indicators length={pictures.length} currentIndex={currentIndex} />
    </Box>
  );
}
