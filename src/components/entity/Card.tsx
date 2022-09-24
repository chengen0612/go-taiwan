import { useMemo } from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { constructSightPath } from "#/utils/helpers/pathname";

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
  const { kind, id, title, pictures } = entity;

  const [firstPicture] = pictures;

  const sightPath = useMemo(() => constructSightPath(kind, id), [kind, id]);

  return (
    <article>
      <Link to={sightPath}>
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
