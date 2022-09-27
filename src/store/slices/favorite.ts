/* eslint-disable no-param-reassign */
import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";

import { Normalized } from "#/utils/helpers/normalize";

import { AllessSearchKind } from "#/utils/constants/searchKind";
import {
  ScenicSpotEntity,
  RestaurantEntity,
  HotelEntity,
  ActivityEntity,
  AnyEntity,
} from "#/utils/types/entity";
import { RootState } from "#/store";

/* Main */
interface KindEntityMap {
  attraction: ScenicSpotEntity;
  food: RestaurantEntity;
  hotel: HotelEntity;
  activity: ActivityEntity;
}

type Entities = {
  [Property in AllessSearchKind]: Normalized<KindEntityMap[Property]>;
};

interface FavoriteState extends Entities {
  count: number;
}

const initialState: FavoriteState = {
  attraction: { byID: {}, allIDs: [] },
  food: { byID: {}, allIDs: [] },
  hotel: { byID: {}, allIDs: [] },
  activity: { byID: {}, allIDs: [] },
  count: 0,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<AnyEntity>) {
      const entity = action.payload;
      const { kind, id } = entity;
      const constraint = state[kind];

      if (!constraint.allIDs.includes(id)) {
        constraint.byID[id] = entity;
        constraint.allIDs.push(id);
        state.count += 1;
      } else {
        delete constraint.byID[id];
        constraint.allIDs = constraint.allIDs.filter((value) => value !== id);
        state.count -= 1;
      }
    },
  },
});

export default favoriteSlice.reducer;

export const { toggleFavorite } = favoriteSlice.actions;

/* Selector */
export const selectIsFavorite = createSelector(
  (store: RootState, kind: AllessSearchKind) => store.favorite[kind],
  (_store: RootState, _kind: AllessSearchKind, id: string) => id,
  (constraint, id) => constraint.allIDs.includes(id)
);

export const selectFavoriteCount = (store: RootState) => store.favorite.count;
