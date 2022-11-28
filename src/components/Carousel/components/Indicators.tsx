import { memo } from "react";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";

interface IndicatorProps {
  selected: boolean;
}

const Indicator = memo(
  styled("span")<IndicatorProps>(({ theme, selected }) => ({
    height: "0.5rem",
    width: "0.5rem",
    borderRadius: "50%",
    backgroundColor: theme.palette.common.white,
    opacity: selected ? 1 : 0.5,
  }))
);

interface IndicatorsProps {
  length: number;
  currentIndex: number;
}

export function Indicators({ length, currentIndex }: IndicatorsProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        position: "absolute",
        bottom: "8%",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {Array.from({ length })
        .reduce<number[]>((acc, _, index) => [...acc, index], [])
        .map((index) => (
          <Indicator key={index} selected={index === currentIndex} />
        ))}
    </Stack>
  );
}
