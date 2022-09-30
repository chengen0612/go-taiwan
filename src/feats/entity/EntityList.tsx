import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useAppSelector } from "#/utils/hooks/store";
import {
  selectEntitiesIDsByKind,
  selectEntityByKindAndID,
} from "#/store/slices/entities";

import Entity from "./Entity";

import { KIND, Kind } from "#/utils/constants/kind";

interface MemoizedEntityProps {
  kind: Kind;
  entityID: string;
}

function MemoizedEntity({ kind, entityID }: MemoizedEntityProps) {
  const entity = useAppSelector(selectEntityByKindAndID(kind, entityID));

  if (!entity) return null;

  return <Entity entity={entity} />;
}

interface EntityListProps {
  kind: Kind;
}

function EntityList({ kind }: EntityListProps) {
  const entitiesIDs = useAppSelector(selectEntitiesIDsByKind(kind));
  const { value: kindValue } = KIND.byKind[kind];

  return (
    <section>
      {/* Title */}
      <Typography
        component="h2"
        variant="h2"
        sx={{
          mt: "2.5rem",
          fontSize: "1.5rem",
          fontWeight: 500,
          color: "secondary.main",
        }}
      >
        {kindValue}
      </Typography>

      {/* Cards */}
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
              <MemoizedEntity key={id} kind={kind} entityID={id} />
            ))}
      </Box>
    </section>
  );
}

export default EntityList;
