import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useSightPath } from "#/utils/hooks/pathname";
import type { AnyEntity } from "#/utils/models/entity";
import Graphic from "#/components/Graphic";
import NO_IMAGE_PATH from "#/assets/images/no-image.png";

import { FavoriteButton } from "./FavoriteButton";
import { switchEntityInfo } from "../utils/switchEntityInfo";

interface EntityProps {
  entity: AnyEntity;
}

export function Entity({ entity }: EntityProps) {
  const { kind, id, title, pictures } = entity;
  const [firstPicture] = pictures;

  const sightPath = useSightPath(kind, id);

  return (
    <article>
      <Link to={sightPath}>
        {/* Media */}
        <Box sx={{ position: "relative", aspectRatio: "4 / 3" }}>
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