/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import TDX, { getIDFilter } from "#/services/tdx";

import { AllessSearchKind } from "#/utils/constants/searchKind";
import { CityName } from "#/utils/constants/city";
import {
  ScenicSpotEntity,
  RestaurantEntity,
  HotelEntity,
  ActivityEntity,
} from "#/utils/types/entity";
import { RootState, AppThunk } from "#/store";

type EntityMap = {
  attraction: ScenicSpotEntity;
  food: RestaurantEntity;
  hotel: HotelEntity;
  activity: ActivityEntity;
};

interface InitialState<T extends AllessSearchKind> {
  id: string;
  kind: T;
  city: CityName;
  entity: EntityMap[T];
  recommendations: EntityMap[T][];
}

export type SetEntityPayload = Pick<
  InitialState<AllessSearchKind>,
  "entity" | "city"
>;

type SetRecommendationsPayload =
  InitialState<AllessSearchKind>["recommendations"];

const initialState: Partial<InitialState<AllessSearchKind>> = {};

const sightSlice = createSlice({
  name: "sight",
  initialState,
  reducers: {
    setEntity(_state, action: PayloadAction<SetEntityPayload>) {
      const { entity, city } = action.payload;
      const { id, kind } = entity;

      return { id, kind, city, entity };
    },

    setRecommendations(
      state,
      action: PayloadAction<SetRecommendationsPayload>
    ) {
      state.recommendations = action.payload;
    },
  },
});

export default sightSlice.reducer;

export const { setEntity, setRecommendations } = sightSlice.actions;

/* Selector */
export const selectSight = (store: RootState) => store.sight;

/* Thunk */
/** Query recommendations by the kind and the city of the viewing entity. */
export const queryRecommendations = (): AppThunk => (dispatch, getState) => {
  const { kind, city, id: excludedID } = selectSight(getState());

  if (kind && city && excludedID) {
    TDX.query({ kind, city, filter: getIDFilter(kind, excludedID), limit: 3 })
      .then((result) => dispatch(setRecommendations(result)))
      .catch((error) => alert(error.message));
  }
};
