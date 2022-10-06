import { Link } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Badge from "@mui/material/Badge";

import { useAppSelector } from "#/utils/hooks/store";
import { useOnFavoritePage } from "#/utils/hooks/navigate";
import { selectFavoriteCount } from "#/store/slices/favorite";

function FavoriteButton() {
  const count = useAppSelector(selectFavoriteCount);
  const onFavoritePage = useOnFavoritePage();

  return (
    <IconButton
      component={Link}
      to="/favorite"
      aria-label="收藏"
      onClick={onFavoritePage}
      sx={{ display: { xs: "none", md: "inline-flex" } }}
    >
      <Badge badgeContent={count} color="favorite">
        <FavoriteBorderIcon />
      </Badge>
    </IconButton>
  );
}

export default FavoriteButton;
