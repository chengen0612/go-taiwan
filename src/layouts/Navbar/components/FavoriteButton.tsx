import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Badge from "@mui/material/Badge";

import { selectFavoriteCount } from "#/store/slices/favorite";
import { useAppSelector } from "#/utils/hooks/store";

export function FavoriteButton() {
  const count = useAppSelector(selectFavoriteCount);

  return (
    <IconButton
      component={Link}
      to="/favorite"
      aria-label="收藏"
      sx={{ display: { xs: "none", md: "inline-flex" } }}
    >
      <Badge badgeContent={count} color="favorite">
        <FavoriteBorderIcon />
      </Badge>
    </IconButton>
  );
}
