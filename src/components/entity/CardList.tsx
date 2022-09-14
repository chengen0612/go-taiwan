import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useAppSelector } from "#/utils/hooks/store";
import {
  selectEntityIDsBySearchKind,
  selectAttractionById,
  selectFoodById,
  selectHotelById,
  selectActivityById,
} from "#/store/slices/entities";

import {
  AttractionCard,
  FoodCard,
  HotelCard,
  ActivityCard,
} from "#/components/entity/Card";

import { SEARCH_KIND, AllessSearchKind } from "#/utils/constants/searchKind";

const switchCardByKind = (kind: AllessSearchKind, entityIds: string[]) => {
  switch (kind) {
    case "attraction":
      return entityIds.map((id) => (
        <AttractionCard key={id} id={id} selector={selectAttractionById} />
      ));

    case "food":
      return entityIds.map((id) => (
        <FoodCard key={id} id={id} selector={selectFoodById} />
      ));

    case "hotel":
      return entityIds.map((id) => (
        <HotelCard key={id} id={id} selector={selectHotelById} />
      ));

    case "activity":
      return entityIds.map((id) => (
        <ActivityCard key={id} id={id} selector={selectActivityById} />
      ));

    default:
      // eslint-disable-next-line
      const _exhaustiveCheck: never = kind;

      return _exhaustiveCheck;
  }
};

interface CardListProps {
  kind: AllessSearchKind;
}

function CardList({ kind }: CardListProps) {
  const entityIds = useAppSelector(selectEntityIDsBySearchKind(kind));
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
        sx={{
          mt: "1.25rem",
          display: "grid",
          rowGap: "1.25rem",
          columnGap: "0.75rem",
        }}
      >
        {!(entityIds.length > 0)
          ? "無符合結果"
          : switchCardByKind(kind, entityIds)}
      </Box>
    </section>
  );
}

export default CardList;
