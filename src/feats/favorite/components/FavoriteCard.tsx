import { useCallback, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  selectFavoriteByKindAndID,
  deleteFavorite,
} from "#/store/slices/favorite";
import { useAppSelector, useAppDispatch } from "#/utils/hooks/store";
import { useSightPath } from "#/utils/hooks/pathname";
import { Kind } from "#/utils/constants/kind";
import { getCityValue } from "#/utils/constants/city";
import Graphic from "#/components/Graphic";
import Tag from "#/components/Tag";
import NO_IMAGE_PATH from "#/assets/images/no-image.png";

interface FavoriteCardProps {
  kind: Kind;
  id: string;
}

export function FavoriteCard({ kind, id }: FavoriteCardProps) {
  const appDispatch = useAppDispatch();

  const favorite = useAppSelector(selectFavoriteByKindAndID(kind, id));
  const sightPath = useSightPath(kind, id);

  const onDelete = useCallback<MouseEventHandler>(
    (event) => {
      event.preventDefault();
      appDispatch(deleteFavorite({ kind, id }));
    },
    [appDispatch, kind, id]
  );

  if (!favorite) return null;

  const { pictures, title, city, categories } = favorite;
  const [firstPicture] = pictures;
  const hasPicture = !!firstPicture;

  return (
    <Box
      component="article"
      sx={(theme) => ({
        borderRadius: "1rem",
        p: "1.5rem",
        backgroundColor: theme.palette.common.white,
        boxShadow:
          "0px 0px 2px rgba(40, 41, 61, 0.04), 0px 4px 8px rgba(96, 97, 112, 0.16)",
        overflow: "hidden", // Force flex box contents to shrink when there has no space.
      })}
    >
      <Link to={sightPath}>
        <Box
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            columnGap: "1.5rem",
            [theme.breakpoints.up("sm")]: {
              columnGap: "2.5rem",
            },
          })}
        >
          {/* Image */}
          <Graphic
            src={hasPicture ? firstPicture.url : NO_IMAGE_PATH}
            alt={hasPicture ? firstPicture.description : "未提供圖片"}
            figureSx={{
              alignSelf: "center",
              aspectRatio: "1 / 1",
              height: "100%",
              width: "24%",
              minWidth: "6rem",
              maxWidth: "8rem",
              borderRadius: "0.5rem",
              bgcolor: hasPicture ? "unset" : "common.white",
              overflow: "hidden",
            }}
            imageSx={{
              objectFit: hasPicture ? "unset" : "common.white",
            }}
          />

          {/* Detail */}
          <Box
            sx={(theme) => ({
              flex: 1,
              alignSelf: "start",
              width: "33%",
              p: "0.375rem 0",
              [theme.breakpoints.up("sm")]: {
                width: "unset",
                p: "0.5rem 0",
              },
            })}
          >
            <Typography
              component="h4"
              sx={(theme) => ({
                m: "unset",
                fontSize: "1rem",
                fontWeight: 500,
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                [theme.breakpoints.up("sm")]: {
                  fontSize: "unset",
                  fontWeight: 700,
                },
              })}
            >
              {title}
            </Typography>
            <Typography
              component="p"
              variant="body1"
              sx={(theme) => ({
                fontSize: "0.875rem",
                [theme.breakpoints.up("sm")]: {
                  fontSize: "1rem",
                },
              })}
            >
              {getCityValue(city)}
            </Typography>
            <Box
              sx={{
                mt: "0.125rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.25rem",
              }}
            >
              {categories.map((category) => (
                <Tag
                  key={category}
                  label={category}
                  color="secondary"
                  responsive
                  sx={{ cursor: "pointer" }}
                />
              ))}
            </Box>
          </Box>

          {/* Delete Button */}
          <IconButton aria-label="移除最愛" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Link>
    </Box>
  );
}
