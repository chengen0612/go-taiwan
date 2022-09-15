import { useCallback } from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useAppSelector, useAppDispatch } from "#/utils/hooks/store";
import { getPeriod } from "#/services/tdx/helper";
import { selectSearchCity } from "#/store/slices/search";
import { setEntity } from "#/store/slices/sight";

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
import { EntityInfoType } from "#/components/entity/CardInfo";

import { ReactComponent as Logo } from "#/assets/images/logo.svg";
import { AllessSearchKind } from "#/utils/constants/searchKind";

const PRIMARY_COLOR = "#00BBF0";

interface CardBaseProps<T extends AnyEntity> {
  entity: T;
  onClick: () => void;
  children: JSX.Element | JSX.Element[];
}

/** Elements passed as children will be placed after title. */
export function CardBase<T extends AnyEntity>({
  entity,
  onClick,
  children,
}: CardBaseProps<T>) {
  const { id, title, pictures } = entity;

  const [picture] = pictures;

  return (
    <article>
      <Link to={`/sight/${id}`} onClick={onClick}>
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

type Entity =
  | ScenicSpotEntity
  | RestaurantEntity
  | HotelEntity
  | ActivityEntity;

export const switchCardInfo = (entity: Entity) => {
  let info: [EntityInfoType, string | undefined][] = [];

  switch (entity.kind) {
    case "attraction":
    case "food": {
      info = [
        ["city", entity.city],
        ["date", entity.openTime],
      ];

      break;
    }

    case "hotel": {
      info = [
        ["city", entity.city],
        ["address", entity.address],
      ];

      break;
    }

    case "activity": {
      const { startTime, endTime } = entity;
      const period = getPeriod(startTime, endTime);

      info = [
        ["city", entity.city],
        ["date", period],
      ];

      break;
    }

    default: {
      // eslint-disable-next-line no-underscore-dangle
      const _exhaustedCheck: never = entity;

      return _exhaustedCheck;
    }
  }

  return (
    <>
      {info.map(([type, value]) => (
        <CardInfo key={type} type={type} value={value} />
      ))}
    </>
  );
};

interface AnyCardProps<T extends AnyEntity> {
  id: string;
  selector: (id: string) => (state: RootState) => T;
}

function AttractionCard({ id, selector }: AnyCardProps<ScenicSpotEntity>) {
  const appDispatch = useAppDispatch();
  const attraction = useAppSelector(selector(id));
  const cityOption = useAppSelector(selectSearchCity);
  const { city, openTime } = attraction;

  const onClick = useCallback(
    () => appDispatch(setEntity({ entity: attraction, city: cityOption })),
    [appDispatch, attraction, cityOption]
  );

  return (
    <CardBase entity={attraction} onClick={onClick}>
      <CardInfo type="city" value={city} />
      <CardInfo type="date" value={openTime} />
    </CardBase>
  );
}

function FoodCard({ id, selector }: AnyCardProps<RestaurantEntity>) {
  const appDispatch = useAppDispatch();
  const food = useAppSelector(selector(id));
  const cityOption = useAppSelector(selectSearchCity);
  const { city, openTime } = food;

  const onClick = useCallback(
    () => appDispatch(setEntity({ entity: food, city: cityOption })),
    [appDispatch, food, cityOption]
  );

  return (
    <CardBase entity={food} onClick={onClick}>
      <CardInfo type="city" value={city} />
      <CardInfo type="time" value={openTime} />
    </CardBase>
  );
}

function HotelCard({ id, selector }: AnyCardProps<HotelEntity>) {
  const appDispatch = useAppDispatch();
  const hotel = useAppSelector(selector(id));
  const cityOption = useAppSelector(selectSearchCity);
  const { city, address } = hotel;

  const onClick = useCallback(
    () => appDispatch(setEntity({ entity: hotel, city: cityOption })),
    [appDispatch, hotel, cityOption]
  );

  return (
    <CardBase entity={hotel} onClick={onClick}>
      <CardInfo type="city" value={city} />
      <CardInfo type="address" value={address} />
    </CardBase>
  );
}

function ActivityCard({ id, selector }: AnyCardProps<ActivityEntity>) {
  const appDispatch = useAppDispatch();
  const activity = useAppSelector(selector(id));
  const cityOption = useAppSelector(selectSearchCity);
  const { city, startTime, endTime } = activity;

  const period = getPeriod(startTime, endTime);

  const onClick = useCallback(
    () => appDispatch(setEntity({ entity: activity, city: cityOption })),
    [appDispatch, activity, cityOption]
  );

  return (
    <CardBase entity={activity} onClick={onClick}>
      <CardInfo type="city" value={city} />
      <CardInfo type="date" value={period} />
    </CardBase>
  );
}

export { AttractionCard, FoodCard, HotelCard, ActivityCard };
