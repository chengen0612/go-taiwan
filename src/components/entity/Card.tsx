import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useAppSelector } from "#/utils/hooks/store";
import {
  selectAttractionById,
  selectFoodById,
  selectHotelById,
  selectActivityById,
} from "#/store/slices/entities";
import { getPeriod } from "#/services/tdx/helper";

import Graphic from "#/components/layout/Graphic";
import CardInfo from "./CardInfo";

import { AnyEntity } from "#/utils/types/entity";
import { AllessSearchKind } from "#/utils/constants/searchKind";
import { ReactComponent as Logo } from "#/assets/images/logo.svg";

const PRIMARY_COLOR = "#00BBF0";

interface CardBaseProps<T> {
  entity: T;
  children: JSX.Element | JSX.Element[];
}

/* Elements passed as children will be placed after title. */
function CardBase<T extends AnyEntity>({ entity, children }: CardBaseProps<T>) {
  const { id, title, pictures } = entity;

  const [picture] = pictures;

  return (
    <article>
      <Link to={`/sight/${id}`}>
        {picture ? (
          <Graphic
            src={picture.url}
            alt={picture.description}
            aspectRatio="4 / 3"
            sx={{ borderRadius: 4, overflow: "hidden" }}
          />
        ) : (
          <Box
            component="figure"
            sx={{
              m: "unset",
              display: "flex",
              placeContent: "space-evenly",
              aspectRatio: "4 / 3",
              borderRadius: 4,
              backgroundColor: "common.white",
            }}
          >
            <Logo stroke={PRIMARY_COLOR} width="auto" height="50%" />
          </Box>
        )}
        <Box sx={{ p: "0.5rem 0.5rem 1rem" }}>
          <Typography component="h4" sx={{ ml: 0.5, fontWeight: 500 }}>
            {title}
          </Typography>
          {children}
        </Box>
      </Link>
    </article>
  );
}

interface AnyCardProps {
  id: string;
}

function AttractionCard({ id }: AnyCardProps) {
  const attraction = useAppSelector(selectAttractionById(id));
  const { city, openTime } = attraction;

  return (
    <CardBase entity={attraction}>
      <CardInfo type="city" value={city} />
      <CardInfo type="date" value={openTime} />
    </CardBase>
  );
}

function FoodCard({ id }: AnyCardProps) {
  const food = useAppSelector(selectFoodById(id));
  const { city, openTime } = food;

  return (
    <CardBase entity={food}>
      <CardInfo type="city" value={city} />
      <CardInfo type="time" value={openTime} />
    </CardBase>
  );
}

function HotelCard({ id }: AnyCardProps) {
  const hotel = useAppSelector(selectHotelById(id));
  const { city, address } = hotel;

  return (
    <CardBase entity={hotel}>
      <CardInfo type="city" value={city} />
      <CardInfo type="address" value={address} />
    </CardBase>
  );
}

function ActivityCard({ id }: AnyCardProps) {
  const activity = useAppSelector(selectActivityById(id));
  const { city, startTime, endTime } = activity;

  const period = getPeriod(startTime, endTime);

  return (
    <CardBase entity={activity}>
      <CardInfo type="city" value={city} />
      <CardInfo type="date" value={period} />
    </CardBase>
  );
}

const kindCardMap: Record<
  AllessSearchKind,
  (props: AnyCardProps) => JSX.Element
> = {
  attraction: AttractionCard,
  food: FoodCard,
  hotel: HotelCard,
  activity: ActivityCard,
};

export { AttractionCard, FoodCard, HotelCard, ActivityCard, kindCardMap };
