import { useCallback } from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useAppSelector, useAppDispatch } from "#/utils/hooks/store";
import { selectSearchCity } from "#/store/slices/search";
import { setEntity, SetEntityPayload } from "#/store/slices/sight";

import Graphic from "#/components/layout/Graphic";
import switchCardInfo from "./switchCardInfo";

import { AnyEntity } from "#/utils/types/entity";

import NO_IMAGE_PATH from "#/assets/images/no-image.png";

const ASPECT_RATIO = "4 / 3";
const BORDER_RADIUS = 4;

interface CardProps {
  entity: AnyEntity;
}

export function Card({ entity }: CardProps) {
  const appDispatch = useAppDispatch();
  const city = useAppSelector(selectSearchCity);

  const { id, title, pictures } = entity;

  const [firstPicture] = pictures;

  const handleClick = useCallback(() => {
    appDispatch(
      setEntity({ entity: entity as SetEntityPayload["entity"], city })
    );
  }, [appDispatch, entity, city]);

  return (
    <article>
      <Link to={`/sight/${id}`} onClick={handleClick}>
        {firstPicture ? (
          <Graphic
            src={firstPicture.url}
            alt={firstPicture.description}
            aspectRatio={ASPECT_RATIO}
            sx={{ borderRadius: BORDER_RADIUS, overflow: "hidden" }}
          />
        ) : (
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
        )}
        <Box sx={{ p: "0.5rem 0.5rem 1rem" }}>
          <Typography component="h4" sx={{ ml: 0.5, fontWeight: 500 }}>
            {title}
          </Typography>
          {switchCardInfo(entity)}
        </Box>
      </Link>
    </article>
  );
}
