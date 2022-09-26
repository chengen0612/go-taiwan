import { Link } from "react-router-dom";
import Stack from "@mui/system/Stack";
import Fab from "@mui/material/Fab";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { ReactComponent as Taiwan } from "#/assets/icons/taiwan.svg";

function FloatingBar() {
  return (
    <Stack
      spacing={3}
      sx={{
        position: "fixed",
        right: "1.5rem",
        bottom: "4%",
        visibility: { xs: "visible", md: "hidden" },
        opacity: { xs: 1, md: 0 },
        transform: { xs: "translateX(0)", md: "translateX(120%)" },
        transition: "all 300ms ease",
      }}
    >
      {/* Home button */}
      <Fab
        component={Link}
        to="/"
        size="large"
        aria-label="首頁"
        sx={{ bgcolor: "white" }}
      >
        <Taiwan height="60%" width="100%" fill="grey" />
      </Fab>
      {/* Collect button */}
      <Fab size="large" aria-label="收藏" sx={{ bgcolor: "white" }}>
        <FavoriteBorderIcon htmlColor="grey" />
      </Fab>
    </Stack>
  );
}

export default FloatingBar;
