import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { FieldName, CITIES, GENRES } from "#/utils/constants/search";
import type { RootState } from "#/store";

/* Main */
const initialState = {
  [FieldName.City]: CITIES.TAIPEI.value,
  [FieldName.Genre]: GENRES.FOOD.value,
  [FieldName.Query]: "",
};

export type SetSearchAction = PayloadAction<{
  name: FieldName;
  value: string;
}>;

/* eslint-disable no-param-reassign */
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch(state, action: SetSearchAction) {
      const { name, value } = action.payload;

      state[name] = value;
      return state;
    },
  },
});

export default searchSlice.reducer;

export const { setSearch } = searchSlice.actions;

/* Selector */
const selectSearch = (store: RootState) => store.search;

const selectSearchByFieldName = createSelector(
  selectSearch,
  (_store: RootState, fieldName: FieldName) => fieldName,
  (search, fieldName) => search[fieldName]
);

export const selectSearchByCity = (store: RootState) =>
  selectSearchByFieldName(store, FieldName.City);

export const selectSearchByGenre = (store: RootState) =>
  selectSearchByFieldName(store, FieldName.Genre);

export const selectSearchByQuery = (store: RootState) =>
  selectSearchByFieldName(store, FieldName.Query);
