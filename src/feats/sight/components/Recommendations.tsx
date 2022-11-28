import Box from "@mui/material/Box";

import { getKindValue, Kind } from "#/utils/constants/kind";
import { getCityValue, CityName } from "#/utils/constants/city";
import type { AnyEntity } from "#/utils/models/entity";
import { Entity } from "#/feats/entity";

import * as S from "./styles";

export interface RecommendationsProps {
  kind: Kind;
  city: CityName;
  entities: AnyEntity[];
}

export function Recommendations({
  kind,
  city,
  entities,
}: RecommendationsProps) {
  return (
    <S.Section>
      <S.Subtitle>
        {`更多${getCityValue(city)}${getKindValue(kind)}`}
      </S.Subtitle>
      <Box
        sx={(theme) => ({
          display: "grid",
          gap: "1.5rem",
          [theme.breakpoints.up("sm")]: {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
        })}
      >
        {entities.length === 0
          ? `沒有其他${getKindValue(kind)}`
          : entities.map((entity) => (
              <Entity key={entity.id} entity={entity} />
            ))}
      </Box>
    </S.Section>
  );
}
