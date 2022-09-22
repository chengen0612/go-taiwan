import { memo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useAppSelector } from "#/utils/hooks/store";
import {
  selectEntitiesIDsByKind,
  selectEntityByKindAndID,
} from "#/store/slices/entities";

import { Card } from "#/components/entity/Card";

import { SEARCH_KIND, AllessSearchKind } from "#/utils/constants/searchKind";

interface CardConnectorProps {
  kind: AllessSearchKind;
  entityID: string;
}

const CardConnector = memo(({ kind, entityID }: CardConnectorProps) => {
  const entity = useAppSelector(selectEntityByKindAndID(kind, entityID));

  if (!entity) return null;

  return <Card entity={entity} />;
});

interface CardListProps {
  kind: AllessSearchKind;
}

function CardList({ kind }: CardListProps) {
  const entitiesIDs = useAppSelector(selectEntitiesIDsByKind(kind));
  const { value: heading, color } = SEARCH_KIND.byIndex[kind];

  return (
    <section>
      <Typography
        component="h2"
        variant="h2"
        sx={{ mt: "2.5rem", fontSize: "1.5rem", fontWeight: 500, color }}
      >
        {heading}
      </Typography>
      <Box
        sx={(theme) => ({
          mt: "1.25rem",
          display: "grid",
          gap: "1.5rem",
          [theme.breakpoints.up("sm")]: {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
          [theme.breakpoints.up("md")]: {
            gridTemplateColumns: "repeat(3, 1fr)",
          },
          [theme.breakpoints.up("lg")]: {
            gridTemplateColumns: "repeat(4, 1fr)",
          },
          [theme.breakpoints.up("xl")]: {
            gridTemplateColumns: "repeat(5, 1fr)",
          },
        })}
      >
        {entitiesIDs.length === 0
          ? "無符合結果"
          : entitiesIDs.map((id) => (
              <CardConnector key={id} kind={kind} entityID={id} />
            ))}
      </Box>
    </section>
  );
}

export default CardList;
