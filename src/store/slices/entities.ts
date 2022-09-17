/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { normalize, Normalized } from "#/utils/helpers/normalize";
import TDX from "#/services/tdx";
import { selectSearchKind, selectSearch } from "./search";

import type { RootState, AppDispatch } from "#/store";
import { AllessSearchKind } from "#/utils/constants/searchKind";
import type {
  ScenicSpotEntity,
  RestaurantEntity,
  HotelEntity,
  ActivityEntity,
  AnyEntity,
} from "#/utils/types/entity";

/* Main */
type EntitiesState = {
  [T in AllessSearchKind]: {
    attraction: Normalized<ScenicSpotEntity>;
    food: Normalized<RestaurantEntity>;
    hotel: Normalized<HotelEntity>;
    activity: Normalized<ActivityEntity>;
  }[T];
};

type SetAllPayload = {
  attraction: ScenicSpotEntity[];
  food: RestaurantEntity[];
  hotel: HotelEntity[];
  activity: ActivityEntity[];
};

const initialState: EntitiesState = {
  attraction: { byID: {}, allIDs: [] },
  food: { byID: {}, allIDs: [] },
  hotel: { byID: {}, allIDs: [] },
  activity: { byID: {}, allIDs: [] },
};

const entitiesSlice = createSlice({
  name: "entities",
  initialState,
  reducers: {
    setAttraction(state, action: PayloadAction<ScenicSpotEntity[]>) {
      const items = action.payload;
      state.attraction = normalize(items);
    },

    setFood(state, action: PayloadAction<RestaurantEntity[]>) {
      const items = action.payload;
      state.food = normalize(items);
    },

    setHotel(state, action: PayloadAction<HotelEntity[]>) {
      const items = action.payload;
      state.hotel = normalize(items);
    },

    setActivity(state, action: PayloadAction<ActivityEntity[]>) {
      const items = action.payload;
      state.activity = normalize(items);
    },

    setAll(state, action: PayloadAction<SetAllPayload>) {
      const { attraction, food, hotel, activity } = action.payload;
      state.attraction = normalize(attraction);
      state.food = normalize(food);
      state.hotel = normalize(hotel);
      state.activity = normalize(activity);
    },
  },
});

export default entitiesSlice.reducer;

const { setAttraction, setFood, setHotel, setActivity, setAll } =
  entitiesSlice.actions;

/* Selector */
export const selectEntities = (store: RootState) => store.entities;

export const selectEntitiesIDsByKind =
  (kind: AllessSearchKind) => (store: RootState) =>
    store.entities[kind].allIDs;

export const selectEntityByKindAndID =
  (kind: AllessSearchKind, id: string) => (store: RootState) =>
    store.entities[kind].byID[id];

/* Thunk */
const queryOneKindData =
  () => (_dispatch: AppDispatch, getState: () => RootState) => {
    const { kind, city, keyword } = selectSearch<AllessSearchKind>(getState());

    return TDX.query({ kind, city, filter: { keyword } });
  };

const setOneKindData =
  (data: AnyEntity[]) => (dispatch: AppDispatch, getState: () => RootState) => {
    const kind = selectSearchKind(getState());

    switch (kind) {
      case "attraction":
        dispatch(setAttraction(data as ScenicSpotEntity[]));
        break;

      case "food":
        dispatch(setFood(data as RestaurantEntity[]));
        break;

      case "hotel":
        dispatch(setHotel(data as HotelEntity[]));
        break;

      case "activity":
        dispatch(setActivity(data as ActivityEntity[]));
        break;

      default: {
        throw new Error(`Invalid kind property ${kind}.`);
      }
    }
  };

const queryAllKindData =
  () => (_dispatch: AppDispatch, getState: () => RootState) => {
    const { keyword, ...rest } = selectSearch<"all">(getState());

    return TDX.queryAll({ ...rest, filter: { keyword } });
  };

const setAllKindData =
  (data: Awaited<ReturnType<typeof TDX.queryAll>>) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { attraction, food, hotel, activity } = data;

    dispatch(setAll({ attraction, food, hotel, activity }));
  };

/**
 * An abstract layer to switch query thunks by search.kind.
 * It is designed to hide the api switching logic from ui component.
 */
export const queryTourismData =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const kind = selectSearchKind(getState());

    if (kind !== "all") {
      dispatch(queryOneKindData())
        .then((data) => dispatch(setOneKindData(data)))
        .catch((error) => alert(error.message));
    } else {
      dispatch(queryAllKindData())
        .then((data) => dispatch(setAllKindData(data)))
        .catch((error) => alert(error.message));
    }
  };
