import { Link } from "react-router-dom";
import Stack from "@mui/system/Stack";
import Fab from "@mui/material/Fab";
import Badge from "@mui/material/Badge";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useAppSelector } from "#/utils/hooks/store";
import { selectFavoriteCount } from "#/store/slices/favorite";

import { ReactComponent as Taiwan } from "#/assets/icons/taiwan.svg";

function FloatingBar() {
  const count = useAppSelector(selectFavoriteCount);

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

      {/* Favorite button */}
      <Fab
        component={Link}
        to="/favorite"
        size="large"
        aria-label="我的最愛"
        sx={{ bgcolor: "white" }}
      >
        <Badge badgeContent={count} color="error">
          <FavoriteBorderIcon htmlColor="grey" />
        </Badge>
      </Fab>
    </Stack>
  );
}

export default FloatingBar;
