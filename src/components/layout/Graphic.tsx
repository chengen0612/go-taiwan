import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";

interface GraphicProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  height?: number | string;
  width?: number | string;
  sx?: SxProps;
}

function Graphic({ src, alt, aspectRatio, height, width, sx }: GraphicProps) {
  return (
    <Box sx={{ aspectRatio, height, width, ...sx }}>
      <img
        src={src}
        alt={alt}
        style={{ height: "100%", width: "100%", objectFit: "cover" }}
      />
    </Box>
  );
}

export default Graphic;
