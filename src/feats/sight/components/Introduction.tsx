import Box from "@mui/material/Box";

import { getKindValue } from "#/utils/constants/kind";
import { AnyEntity } from "#/utils/models/entity";

import * as S from "./styles";
import { FavoriteButton } from "./FavoriteButton";
import { switchSightInfo } from "../utils/switchSightInfo";

export interface IntroductionProps {
  entity: AnyEntity;
}

export function Introduction({ entity }: IntroductionProps) {
  const { title, kind, description } = entity;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <S.Title>{title}</S.Title>
        <FavoriteButton entity={entity} />
      </Box>
      <Box
        sx={{
          p: "1rem 1.25rem",
          borderRadius: "0.5rem",
          backgroundColor: "#f1f8ea",
        }}
      >
        {switchSightInfo(entity)}
      </Box>
      <S.Section>
        <S.Subtitle>{getKindValue(kind)}</S.Subtitle>
        <p>{description || "未提供資訊"}</p>
      </S.Section>
    </>
  );
}
