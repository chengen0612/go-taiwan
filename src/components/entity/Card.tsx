import { useMemo } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { constructSightPath } from "#/utils/helpers/pathname";
import { useIsFavorite, useOnFavorite } from "#/utils/hooks/favorite";

import Graphic from "#/components/layout/Graphic";
import switchCardInfo from "./switchCardInfo";

import { AnyEntity } from "#/utils/types/entity";
import NO_IMAGE_PATH from "#/assets/images/no-image.png";

const ASPECT_RATIO = "4 / 3";
const BORDER_RADIUS = 4;

function FallbackImage() {
  return (
    <Box
      component="figure"
      sx={{
        aspectRatio: ASPECT_RATIO,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: BORDER_RADIUS,
        backgroundColor: "common.white",
      }}
    >
      <Graphic
        src={NO_IMAGE_PATH}
        alt="未提供圖片"
        height="80%"
        objectFit="contain"
      />
    </Box>
  );
}

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

interface CardProps {
  entity: AnyEntity;
}

export function Card({ entity }: CardProps) {
  const { kind, id, title, pictures } = entity;
  const [firstPicture] = pictures;

  const sightPath = useMemo(() => constructSightPath(kind, id), [kind, id]);

  return (
    <article>
      <Link to={sightPath}>
        <Container sx={{ position: "relative", aspectRatio: ASPECT_RATIO }}>
          {firstPicture ? (
            <Graphic
              src={firstPicture.url}
              alt={firstPicture.description}
              aspectRatio={ASPECT_RATIO}
              sx={{ borderRadius: BORDER_RADIUS, overflow: "hidden" }}
            />
          ) : (
            <FallbackImage />
          )}
          <FavoriteButton entity={entity} />
        </Container>
        <Box sx={{ p: "0.5rem" }}>
          <Typography component="h4" sx={{ ml: 0.5, fontWeight: 500 }}>
            {title}
          </Typography>
          {switchCardInfo(entity)}
        </Box>
      </Link>
    </article>
  );
}
