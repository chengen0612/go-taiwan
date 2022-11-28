import Box from "@mui/material/Box";

import { Picture } from "#/utils/models/base";
import Carousel from "#/components/Carousel";

export interface HeaderProps {
  pictures: Picture[];
}

export function Header({ pictures }: HeaderProps) {
  return (
    <Box
      component="header"
      sx={{
        aspectRatio: "3 / 2",
        borderRadius: "1.5rem",
        boxShadow:
          "0px 0px 2px rgba(40, 41, 61, 0.04), 0px 4px 8px rgba(96, 97, 112, 0.16)",
        overflow: "hidden",
        // Fix the inconsistent border radius between animations on safari.
        // Below is a different solution to similar issues.
        // https://gist.github.com/ayamflow/b602ab436ac9f05660d9c15190f4fd7b
        isolation: "isolate",
      }}
    >
      <Carousel pictures={pictures} />
    </Box>
  );
}
