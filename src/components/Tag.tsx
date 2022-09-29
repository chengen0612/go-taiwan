import { styled } from "@mui/system";
import Chip, { ChipProps } from "@mui/material/Chip";

interface TagProps extends ChipProps {
  responsive?: boolean;
}

const Tag = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "responsive",
  skipSx: false,
})<TagProps>(({ theme, responsive = false }) => ({
  height: "unset",
  borderRadius: "0.375rem",
  padding: "0.25rem 0.375rem",
  fontSize: "0.875rem",
  "& .MuiChip-label": {
    padding: 0,
  },
  ...(responsive && {
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0.25rem",
      fontSize: "0.625rem",
    },
  }),
}));

export default Tag;
