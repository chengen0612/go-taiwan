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

import { ReactComponent as Logo } from "#/assets/images/logo.svg";

const PRIMARY_COLOR = "#00BBF0";

interface CardProps<T extends AnyEntity> {
  entity: T;
}

export function Card<T extends AnyEntity>({ entity }: CardProps<T>) {
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
            aspectRatio="4 / 3"
            sx={{ borderRadius: 4, overflow: "hidden" }}
          />
        ) : (
          <Box
            component="figure"
            sx={{
              m: "unset",
              aspectRatio: "4 / 3",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
              backgroundColor: "common.white",
            }}
          >
            <Logo width="56%" stroke={PRIMARY_COLOR} />
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
