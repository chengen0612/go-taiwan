import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { SearchProperty, CITY, KIND } from "#/utils/constants/search";
import type { CityName, SearchKind } from "#/utils/constants/search";
import type { RootState } from "#/store";

/* Main */
export interface SearchState {
  [SearchProperty.Kind]: SearchKind;
  [SearchProperty.City]: CityName;
  [SearchProperty.Keyword]: string;
}

export type TourismQueryKind = Exclude<SearchKind, "all">;

export type TourismQueryOption<T extends TourismQueryKind> = {
  [U in keyof SearchState]: U extends SearchProperty.Kind ? T : SearchState[U];
};

export type TourismQueryAllOption = Omit<SearchState, "kind">;

export interface SetSearchPayload {
  searchProperty: SearchProperty;
  value: CityName | SearchKind | string;
}

const initialState: SearchState = {
  kind: KIND.byIndex.all.key,
  city: CITY.byName.taipei.key,
  keyword: "",
};

/* eslint-disable no-param-reassign */
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<SetSearchPayload>) {
      const { searchProperty, value } = action.payload;

      switch (searchProperty) {
        case "kind":
          state.kind = value as SearchKind;
          break;

        case "city":
          state.city = value as CityName;
          break;

        case "keyword":
          state.keyword = value;
          break;

        default:
          throw new Error(
            `SearchSlice update failed because of unknown search property ${searchProperty}`
          );
      }

      return state;
    },
  },
});

export default searchSlice.reducer;

export const { setSearch } = searchSlice.actions;

/* Selector */
export const selectSearch = (store: RootState) => store.search;

export const selectSearchCity = createSelector(
  selectSearch,
  (search) => search.city
);

export const selectSearchKind = createSelector(
  selectSearch,
  (search) => search.kind
);

export const selectSearchKeyword = createSelector(
  selectSearch,
  (search) => search.keyword
);
