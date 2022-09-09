/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import TDX from "#/services/tdx";
import { selectSearchKind, selectSearch } from "./search";

import type { AppThunk, RootState } from "#/store";
import type {
  SearchKind,
  AllessSearchKind,
} from "#/utils/constants/searchKind";
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

type EntitiesState = {
  [T in AllessSearchKind]: {
    attraction: AnyEntities<ScenicSpotEntity>;
    food: AnyEntities<RestaurantEntity>;
    hotel: AnyEntities<HotelEntity>;
    activity: AnyEntities<ActivityEntity>;
  }[T];
};

type SetAllPayload = Awaited<ReturnType<typeof TDX.queryAll>>;

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

/* Selector */
export const selectEntities = (store: RootState) => store.entities;

export const selectEntityIDsBySearchKind =
  (kind: AllessSearchKind) => (store: RootState) =>
    store.entities[kind].allIDs;

export const selectAttractionById = (id: string) => (store: RootState) =>
  store.entities.attraction.byID[id];

export const selectFoodById = (id: string) => (store: RootState) =>
  store.entities.food.byID[id];

export const selectHotelById = (id: string) => (store: RootState) =>
  store.entities.hotel.byID[id];

export const selectActivityById = (id: string) => (store: RootState) =>
  store.entities.activity.byID[id];

/* Thunk */
const queryScenicSpot = (): AppThunk => (dispatch, getState) => {
  const options = selectSearch<"attraction">(getState());

  TDX.queryScenicSpot(options)
    .then((result) => dispatch(setAttraction(result)))
    .catch((error) => alert(error.message));
};

const queryRestaurant = (): AppThunk => (dispatch, getState) => {
  const options = selectSearch<"food">(getState());

  TDX.queryRestaurant(options)
    .then((result) => dispatch(setFood(result)))
    .catch((error) => alert(error.message));
};

const queryHotel = (): AppThunk => (dispatch, getState) => {
  const options = selectSearch<"hotel">(getState());

  TDX.queryHotel(options)
    .then((result) => dispatch(setHotel(result)))
    .catch((error) => alert(error.message));
};

const queryActivity = (): AppThunk => (dispatch, getState) => {
  const options = selectSearch<"activity">(getState());

  TDX.queryActivity(options)
    .then((result) => dispatch(setActivity(result)))
    .catch((error) => alert(error.message));
};

const queryAll = (): AppThunk => (dispatch, getState) => {
  const options = selectSearch<"all">(getState());

  TDX.queryAll(options)
    .then((result) => dispatch(setAll(result)))
    .catch((error) => alert(error.message));
};

const tourismQueryMap: Record<SearchKind, () => AppThunk> = {
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
