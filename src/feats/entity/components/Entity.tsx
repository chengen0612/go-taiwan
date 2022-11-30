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
  const hasPicture = !!firstPicture;

  const sightPath = useSightPath(kind, id);

  return (
    <article>
      <Box
        component={Link}
        to={sightPath}
        sx={(theme) => ({
          display: "block",
          height: "100%",
          borderRadius: 4,
          p: 2.5,
          "&:hover": {
            backgroundColor: theme.palette.grey[200],
          },
        })}
      >
        {/* Media */}
        <Box sx={{ position: "relative", aspectRatio: "4 / 3" }}>
          <Graphic
            src={hasPicture ? firstPicture.url : NO_IMAGE_PATH}
            alt={hasPicture ? firstPicture.description : "未提供圖片"}
            figureSx={{
              height: "100%",
              width: "100%",
            }}
            imageSx={{
              borderRadius: 4,
              objectFit: hasPicture ? "cover" : "contain",
              bgcolor: hasPicture ? "unset" : "common.white",
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
      </Box>
    </article>
  );
}
