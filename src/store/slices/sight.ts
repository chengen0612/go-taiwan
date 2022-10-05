/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

import TDX from "#/services/tdx";

import { Kind } from "#/utils/constants/kind";
import { AnyEntity } from "#/utils/models/entity";
import { RootState, AppThunk } from "#/store";
import { setError } from "#/store/slices/status";
import HTTPError from "#/utils/helpers/http-error";

import { AnonymousError } from "#/utils/models/base";

interface InitialState {
  entity: AnyEntity | undefined;
  recommendations: AnyEntity[] | undefined;
}

const initialState: InitialState = {
  entity: undefined,
  recommendations: undefined,
};

type SetEntityPayload = NonNullable<InitialState["entity"]>;
type SetRecommendationsPayload = NonNullable<InitialState["recommendations"]>;

const sightSlice = createSlice({
  name: "sight",
  initialState,
  reducers: {
    setEntity(state, action: PayloadAction<SetEntityPayload>) {
      state.entity = action.payload;
    },

    setRecommendations(
      state,
      action: PayloadAction<SetRecommendationsPayload>
    ) {
      state.recommendations = action.payload;
    },

    reset() {
      return initialState;
    },
  },
});

export default sightSlice.reducer;

export const {
  setEntity,
  setRecommendations,
  reset: resetSight,
} = sightSlice.actions;

/* Selector */
export const selectSight = (store: RootState) => store.sight;

export const selectSightEntity = createSelector(
  selectSight,
  (sight) => sight.entity
);

export const selectSightRecommendations = createSelector(
  selectSight,
  (sight) => sight.recommendations
);

/* Thunk */
export const loadSight =
  (kind: Kind, id: string): AppThunk<Promise<void>> =>
  async (dispatch) => {
    try {
      const [entity] = await TDX.queryID(kind, id);

      if (!entity) {
        throw new HTTPError(404);
      }

      const { city, id: excludedID } = entity;
      const recommendations = await TDX.query({
        kind,
        city,
        filter: { excludedID },
        limit: 4,
      });

      dispatch(setEntity(entity));
      dispatch(setRecommendations(recommendations));
    } catch (error) {
      if (error instanceof Error) {
        const { message, code } = error as AnonymousError;
        dispatch(setError({ message, code }));
      }
    }
  };
