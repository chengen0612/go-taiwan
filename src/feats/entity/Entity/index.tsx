import { useMemo } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { constructSightPath } from "#/utils/helpers/pathname";

import Graphic from "#/components/layout/Graphic";
import FavoriteButton from "./FavoriteButton";
import switchEntityInfo from "./switchEntityInfo";

import { AnyEntity } from "#/utils/types/entity";
import NO_IMAGE_PATH from "#/assets/images/no-image.png";

interface EntityProps {
  entity: AnyEntity;
}

function Entity({ entity }: EntityProps) {
  const { kind, id, title, pictures } = entity;
  const [firstPicture] = pictures;

  const sightPath = useMemo(() => constructSightPath(kind, id), [kind, id]);

  return (
    <article>
      <Link to={sightPath}>
        <Box sx={{ position: "relative", aspectRatio: "4 / 3" }}>
          {/* Image */}
          <Graphic
            src={firstPicture ? firstPicture.url : NO_IMAGE_PATH}
            alt={firstPicture ? firstPicture.description : "未提供圖片"}
            height="100%"
            width="100%"
            objectFit={firstPicture ? "cover" : "contain"}
            sx={{
              borderRadius: 4,
              bgcolor: firstPicture ? "unset" : "common.white",
              overflow: "hidden",
            }}
          />

          {/* Favorite button */}
          <FavoriteButton entity={entity} />
        </Box>

        {/* Detail */}
        <Box sx={{ p: "0.5rem" }}>
          <Typography component="h4" sx={{ ml: 0.5, fontWeight: 500 }}>
            {title}
          </Typography>

          {switchEntityInfo(entity)}
        </Box>
      </Link>
    </article>
  );
}

export default Entity;
