import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { CITY, CityName } from "#/utils/constants/city";
import { SEARCH_KIND, SearchKind } from "#/utils/constants/searchKind";

import type { SearchProperty } from "#/utils/types/search";
import type { RootState } from "#/store";

/* Main */
type SearchState = {
  [T in SearchProperty]: {
    [SearchProperty.Kind]: SearchKind;
    [SearchProperty.City]: CityName;
    [SearchProperty.Keyword]: string;
  }[T];
};

export type SearchOptions<T extends SearchKind> = {
  [U in keyof SearchState]: U extends "kind" ? T : SearchState[U];
};

export interface SetSearchPayload {
  searchProperty: SearchProperty;
  value: CityName | SearchKind | string;
}

const initialState: SearchState = {
  kind: SEARCH_KIND.byIndex.all.key,
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
    },
  },
});

export default searchSlice.reducer;

export const { setSearch } = searchSlice.actions;

/* Selector */
export const selectSearch = <T extends SearchKind>(store: RootState) =>
  store.search as SearchOptions<T>;

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
