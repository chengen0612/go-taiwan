import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useIsFavorite, useOnFavorite } from "#/utils/hooks/favorite";

import { AnyEntity } from "#/utils/models/entity";

interface FavoriteButtonProps {
  entity: AnyEntity;
}

function FavoriteButton({ entity }: FavoriteButtonProps) {
  const isFavorite = useIsFavorite(entity);
  const onFavorite = useOnFavorite(entity);

  return (
    <IconButton
      aria-label="收藏"
      sx={{
        position: "absolute",
        top: "0.5rem",
        right: "0.5rem",
        height: "2rem",
        width: "2rem",
        p: "unset",
      }}
      onClick={onFavorite}
    >
      <FavoriteIcon
        sx={{
          color: isFavorite ? "favorite.main" : "grey",
          stroke: "white",
          strokeWidth: 2,
        }}
      />
    </IconButton>
  );
}

export default FavoriteButton;
