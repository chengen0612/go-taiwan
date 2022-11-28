import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material";
import type { Theme } from "@mui/material/styles";

interface GraphicProps {
  src: string;
  alt: string;
  figureSx?: SxProps<Theme>;
  imageSx?: SxProps<Theme>;
}

const defaultImageSx = { height: "100%", width: "100%", objectFit: "cover" };

function Graphic(props: GraphicProps) {
  const { src, alt, figureSx, imageSx } = props;

  return (
    <Box component="figure" sx={figureSx}>
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={
          Array.isArray(imageSx)
            ? [defaultImageSx, ...imageSx]
            : [defaultImageSx, imageSx]
        }
      />
    </Box>
  );
}

export default Graphic;
