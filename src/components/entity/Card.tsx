import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useAppSelector } from "#/utils/hooks/store";
import { getPeriod } from "#/services/tdx/helper";

import Graphic from "#/components/layout/Graphic";
import CardInfo from "./CardInfo";

import {
  AnyEntity,
  ScenicSpotEntity,
  RestaurantEntity,
  HotelEntity,
  ActivityEntity,
} from "#/utils/types/entity";
import { RootState } from "#/store";

import { ReactComponent as Logo } from "#/assets/images/logo.svg";

const PRIMARY_COLOR = "#00BBF0";

interface CardBaseProps<T extends AnyEntity> {
  entity: T;
  children: JSX.Element | JSX.Element[];
}

/** Elements passed as children will be placed after title. */
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
              aspectRatio: "4 / 3",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
              backgroundColor: "common.white",
            }}
          >
            <Logo width="56%" stroke={PRIMARY_COLOR} />
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

interface AnyCardProps<T extends AnyEntity> {
  id: string;
  selector: (id: string) => (state: RootState) => T;
}

function AttractionCard({ id, selector }: AnyCardProps<ScenicSpotEntity>) {
  const attraction = useAppSelector(selector(id));
  const { city, openTime } = attraction;

  return (
    <CardBase entity={attraction}>
      <CardInfo type="city" value={city} />
      <CardInfo type="date" value={openTime} />
    </CardBase>
  );
}

function FoodCard({ id, selector }: AnyCardProps<RestaurantEntity>) {
  const food = useAppSelector(selector(id));
  const { city, openTime } = food;

  return (
    <CardBase entity={food}>
      <CardInfo type="city" value={city} />
      <CardInfo type="time" value={openTime} />
    </CardBase>
  );
}

function HotelCard({ id, selector }: AnyCardProps<HotelEntity>) {
  const hotel = useAppSelector(selector(id));
  const { city, address } = hotel;

  return (
    <CardBase entity={hotel}>
      <CardInfo type="city" value={city} />
      <CardInfo type="address" value={address} />
    </CardBase>
  );
}

function ActivityCard({ id, selector }: AnyCardProps<ActivityEntity>) {
  const activity = useAppSelector(selector(id));
  const { city, startTime, endTime } = activity;

  const period = getPeriod(startTime, endTime);

  return (
    <CardBase entity={activity}>
      <CardInfo type="city" value={city} />
      <CardInfo type="date" value={period} />
    </CardBase>
  );
}

export { AttractionCard, FoodCard, HotelCard, ActivityCard };
