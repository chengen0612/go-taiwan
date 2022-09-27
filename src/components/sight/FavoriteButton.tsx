import { memo } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useIsFavorite, useOnFavorite } from "#/utils/hooks/favorite";

import { AnyEntity } from "#/utils/types/entity";

interface FavoriteButtonProps {
  entity: AnyEntity;
}

function FavoriteButton({ entity }: FavoriteButtonProps) {
  const isFavorite = useIsFavorite(entity);
  const onFavorite = useOnFavorite(entity);

  return (
    <IconButton aria-label="收藏" onClick={onFavorite}>
      <FavoriteIcon sx={{ color: isFavorite ? "favorite.main" : "grey" }} />
    </IconButton>
  );
}

export default memo(FavoriteButton);
