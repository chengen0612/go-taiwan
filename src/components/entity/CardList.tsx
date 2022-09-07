import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useAppSelector } from "#/utils/hooks/store";
import { selectEntityIDsBySearchKind } from "#/store/slices/entities";

import { kindCardMap } from "#/components/entity/Card";

import { SEARCH_KIND, AllessSearchKind } from "#/utils/constants/searchKind";

interface CardListProps {
  kind: AllessSearchKind;
}

function CardList({ kind }: CardListProps) {
  const entityIds = useAppSelector(selectEntityIDsBySearchKind(kind));
  const { value: heading, color } = SEARCH_KIND.byIndex[kind];
  const Card = kindCardMap[kind];

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
        sx={{
          mt: "1.25rem",
          display: "grid",
          rowGap: "1.25rem",
          columnGap: "0.75rem",
        }}
      >
        {!(entityIds.length > 0)
          ? "無符合結果"
          : entityIds.map((id) => <Card key={id} id={id} />)}
      </Box>
    </section>
  );
}

export default CardList;
