/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TDXService } from "#/services/tdx";
import { selectSearchKind, selectSearch } from "./search";

import type { AppThunk } from "#/store";
import { SearchKind } from "#/utils/constants/search";
import type {
  ScenicSpotEntity,
  RestaurantEntity,
  HotelEntity,
  ActivityEntity,
} from "#/utils/types/entity";

/* Main */
interface AnyEntities<T> {
  byID: { [key: string]: T };
  allIDs: string[];
}

interface EntitiesState {
  attraction: AnyEntities<ScenicSpotEntity>;
  food: AnyEntities<RestaurantEntity>;
  hotel: AnyEntities<HotelEntity>;
  activity: AnyEntities<ActivityEntity>;
}

interface SetAllPayload {
  attraction: ScenicSpotEntity[];
  food: RestaurantEntity[];
  hotel: HotelEntity[];
  activity: ActivityEntity[];
}

const initialState: EntitiesState = {
  attraction: { byID: {}, allIDs: [] },
  food: { byID: {}, allIDs: [] },
  hotel: { byID: {}, allIDs: [] },
  activity: { byID: {}, allIDs: [] },
};

const entitiesToState = <T extends { id: string }>(items: T[]) =>
  items.reduce<AnyEntities<T>>(
    (acc, item) => {
      const { id } = item;

      acc.byID[id] = item;
      acc.allIDs.push(id);

      return acc;
    },
    { byID: {}, allIDs: [] }
  );

const entitiesSlice = createSlice({
  name: "entities",
  initialState,
  reducers: {
    setAttraction(state, action: PayloadAction<ScenicSpotEntity[]>) {
      const items = action.payload;
      state.attraction = entitiesToState(items);
    },

    setFood(state, action: PayloadAction<RestaurantEntity[]>) {
      const items = action.payload;
      state.food = entitiesToState(items);
    },

    setHotel(state, action: PayloadAction<HotelEntity[]>) {
      const items = action.payload;
      state.hotel = entitiesToState(items);
    },

    setActivity(state, action: PayloadAction<ActivityEntity[]>) {
      const items = action.payload;
      state.activity = entitiesToState(items);
    },

    setAll(state, action: PayloadAction<SetAllPayload>) {
      const { attraction, food, hotel, activity } = action.payload;
      state.attraction = entitiesToState(attraction);
      state.food = entitiesToState(food);
      state.hotel = entitiesToState(hotel);
      state.activity = entitiesToState(activity);
    },
  },
});

export default entitiesSlice.reducer;

const { setAttraction, setFood, setHotel, setActivity, setAll } =
  entitiesSlice.actions;

/* Thunk */
const queryScenicSpot = (): AppThunk => (dispatch, getState) => {
  const options = selectSearch<"attraction">(getState());

  const tdx = new TDXService();

  tdx
    .queryScenicSpot(options)
    .then((result) => dispatch(setAttraction(result)))
    .catch((error) => alert(error.message));
};

const queryRestaurant = (): AppThunk => (dispatch, getState) => {
  const options = selectSearch<"food">(getState());

  const tdx = new TDXService();

  tdx
    .queryRestaurant(options)
    .then((result) => dispatch(setFood(result)))
    .catch((error) => alert(error.message));
};

const queryHotel = (): AppThunk => (dispatch, getState) => {
  const options = selectSearch<"hotel">(getState());

  const tdx = new TDXService();

  tdx
    .queryHotel(options)
    .then((result) => dispatch(setHotel(result)))
    .catch((error) => alert(error.message));
};

const queryActivity = (): AppThunk => (dispatch, getState) => {
  const options = selectSearch<"activity">(getState());

  const tdx = new TDXService();

  tdx
    .queryActivity(options)
    .then((result) => dispatch(setActivity(result)))
    .catch((error) => alert(error.message));
};

const queryAll = (): AppThunk => (dispatch, getState) => {
  const options = selectSearch<"all">(getState());

  const tdx = new TDXService();

  tdx
    .queryAll(options)
    .then((result) => dispatch(setAll(result)))
    .catch((error) => alert(error.message));
};

type TourismQueryMap = {
  [Property in SearchKind]: () => AppThunk;
};

const tourismQueryMap: TourismQueryMap = {
  attraction: queryScenicSpot,
  food: queryRestaurant,
  hotel: queryHotel,
  activity: queryActivity,
  all: queryAll,
};

/**
 * An abstract layer to switch query thunks by search.kind.
 * It is designed to hide the api switching logic from ui component.
 */
export const queryTourismData = (): AppThunk => (dispatch, getState) => {
  const kind = selectSearchKind(getState());

  const queryThunk = tourismQueryMap[kind];

  dispatch(queryThunk());
};
