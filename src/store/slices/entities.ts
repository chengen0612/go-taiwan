/* eslint-disable no-param-reassign */
import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";

import { normalize, Normalized } from "#/utils/helpers/normalize";
import TDX from "#/services/tdx";
import { Kind } from "#/utils/constants/kind";
import { selectSearchKind, selectSearch } from "./search";
import { setLoaded, setError } from "./status";

import type { RootState, AppDispatch } from "#/store";
import type {
  ScenicSpotEntity,
  RestaurantEntity,
  HotelEntity,
  ActivityEntity,
} from "#/utils/models/entity";
import { AnonymousError } from "#/utils/models/base";

/* Main */
type EntitiesState = {
  [T in Kind]: {
    attraction: Normalized<ScenicSpotEntity>;
    food: Normalized<RestaurantEntity>;
    hotel: Normalized<HotelEntity>;
    activity: Normalized<ActivityEntity>;
  }[T];
};

type SetAllPayload = Awaited<ReturnType<typeof TDX.queryAll>>;

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

    reset() {
      return initialState;
    },
  },
});

export default entitiesSlice.reducer;

const {
  setAttraction,
  setFood,
  setHotel,
  setActivity,
  setAll,
  reset: resetEntities,
} = entitiesSlice.actions;

export { resetEntities };

/* Selector */
export const selectEntities = (store: RootState) => store.entities;

export const selectEntitiesIDsByKind = (kind: Kind) =>
  createSelector(
    (store: RootState) => store.entities[kind],
    (constraint) => constraint.allIDs
  );

export const selectEntityByKindAndID = (kind: Kind, id: string) =>
  createSelector(
    (store: RootState) => store.entities[kind],
    (constraint) => constraint.byID[id]
  );

/* Thunk */
const setOneKindData =
  (data: Awaited<ReturnType<typeof TDX.query>>) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const kind = selectSearchKind(getState()) as Kind;

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

/**
 * An abstract layer to switch query thunks by search.kind.
 * It is designed to hide the api switching logic from ui component.
 */
export const queryTourismData =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { kind, city, keyword } = selectSearch(getState());

    dispatch(setLoaded(false));

    try {
      if (kind !== "all") {
        const data = await TDX.query({ kind, city, filter: { keyword } });
        dispatch(setOneKindData(data));
      } else {
        const data = await TDX.queryAll({ kind, city, filter: { keyword } });
        dispatch(setAll(data));
      }
    } catch (error) {
      if (error instanceof Error) {
        const { code, message } = error as AnonymousError;
        dispatch(setError({ code, message }));
      }
    } finally {
      dispatch(setLoaded(true));
    }
  };
