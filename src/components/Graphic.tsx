import { CSSProperties } from "react";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

interface GraphicProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  height?: number | string;
  width?: number | string;
  objectFit?: CSSProperties["objectFit"];
  sx?: SxProps<Theme>;
}

function Graphic({
  src,
  alt,
  aspectRatio,
  height,
  width,
  objectFit = "cover",
  sx,
}: GraphicProps) {
  return (
    <Box component="figure" sx={{ aspectRatio, height, width, ...sx }}>
      <img
        src={src}
        alt={alt}
        style={{ height: "100%", width: "100%", objectFit }}
      />
    </Box>
  );
}

export default Graphic;
