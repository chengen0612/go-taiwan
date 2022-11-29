import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Kind } from "#/utils/constants/kind";
import { CITY, CityName } from "#/utils/constants/city";
import { SearchProperty } from "#/utils/models/search";

import type { RootState } from "..";

/* Main */
export interface SearchState {
  [SearchProperty.Kind]: Kind | "all";
  [SearchProperty.City]: CityName;
  [SearchProperty.Keyword]: string;
}

export type SearchKind = SearchState["kind"];

export type SetSearchPayload =
  | { searchProperty: SearchProperty.Kind; value: SearchKind }
  | { searchProperty: SearchProperty.City; value: CityName }
  | { searchProperty: SearchProperty.Keyword; value: string };

type ReplacePayload = {
  [Property in keyof SearchState]: SearchState[Property] | null;
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

    replace(state, action: PayloadAction<ReplacePayload>) {
      const { kind, city, keyword } = action.payload;

      return {
        kind: kind ?? state.kind,
        city: city ?? state.city,
        keyword: keyword ?? state.keyword,
      };
    },

    reset() {
      return initialState;
    },
  },
});

const {
  setSearch,
  replace: replaceSearch,
  reset: resetSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
export { setSearch, replaceSearch, resetSearch };

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
