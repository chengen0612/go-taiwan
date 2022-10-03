import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { SearchProperty } from "#/utils/models/search";
import { CITY, CityName } from "#/utils/constants/city";

import type { Kind } from "#/utils/constants/kind";
import type { RootState } from "#/store";

/* Main */
interface SearchState {
  [SearchProperty.Kind]: Kind | "all";
  [SearchProperty.City]: CityName;
  [SearchProperty.Keyword]: string;
}

export type SearchKind = SearchState["kind"];

export type SearchOptions<T extends SearchKind> = {
  [U in keyof SearchState]: U extends "kind" ? T : SearchState[U];
};

export type SetSearchPayload =
  | { searchProperty: SearchProperty.City; value: CityName }
  | { searchProperty: SearchProperty.Kind; value: SearchKind }
  | { searchProperty: SearchProperty.Keyword; value: string };

type ReplaceSearchPayload = {
  [T in keyof SearchState]: SearchState[T] | null;
};

const initialState: SearchState = {
  kind: "all",
  city: CITY.byName.taipei.key,
  keyword: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<SetSearchPayload>) {
      const { searchProperty, value } = action.payload;

      return {
        ...state,
        [searchProperty]: value,
      };
    },

    replaceSearch(state, action: PayloadAction<ReplaceSearchPayload>) {
      const { kind, city, keyword } = action.payload;

      return {
        kind: kind ?? state.kind,
        city: city ?? state.city,
        keyword: keyword ?? state.keyword,
      };
    },

    resetSearch() {
      return initialState;
    },
  },
});

export default searchSlice.reducer;

export const { setSearch, replaceSearch, resetSearch } = searchSlice.actions;

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
