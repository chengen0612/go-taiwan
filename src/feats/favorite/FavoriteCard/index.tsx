import { useCallback, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppSelector, useAppDispatch } from "#/utils/hooks/store";
import {
  selectFavoriteByKindAndID,
  deleteFavorite,
} from "#/store/slices/favorite";
import { getCityValue } from "#/utils/constants/city";

import * as S from "./styles";
import Graphic from "#/components/Graphic";
import Tag from "#/components/Tag";

import { Kind } from "#/utils/constants/kind";
import { useSightPath } from "#/utils/hooks/pathname";

import NO_IMAGE_PATH from "#/assets/images/no-image.png";

interface FavoriteCardProps {
  kind: Kind;
  id: string;
}

function FavoriteCard({ kind, id }: FavoriteCardProps) {
  const favorite = useAppSelector(selectFavoriteByKindAndID(kind, id));
  const appDispatch = useAppDispatch();

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

  return (
    <S.Wrapper>
      <Link to={sightPath}>
        <S.Root>
          {/* Image */}
          <Graphic
            src={firstPicture ? firstPicture.url : NO_IMAGE_PATH}
            alt={firstPicture ? firstPicture.description : "未提供圖片"}
            height="100%"
            aspectRatio="1 / 1"
            objectFit={firstPicture ? "cover" : "contain"}
            sx={{
              alignSelf: "center",
              width: "24%",
              minWidth: "6rem",
              maxWidth: "8rem",
              borderRadius: "0.5rem",
              bgcolor: firstPicture ? "unset" : "common.white",
              overflow: "hidden",
            }}
          />

          {/* Detail */}
          <S.Detail>
            <S.Title>{title}</S.Title>
            <S.CityValue>{getCityValue(city)}</S.CityValue>
            <S.Tags>
              {categories.map((category) => (
                <Tag
                  key={category}
                  label={category}
                  color="secondary"
                  responsive
                />
              ))}
            </S.Tags>
          </S.Detail>

          {/* Delete button */}
          <IconButton aria-label="移除最愛" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </S.Root>
      </Link>
    </S.Wrapper>
  );
}

export default FavoriteCard;
