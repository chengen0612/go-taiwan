/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

import TDX from "#/services/tdx";

import { Kind } from "#/utils/constants/kind";
import { AnyEntity } from "#/utils/models/entity";
import { RootState, AppThunk } from "#/store";

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
export const queryEntity =
  (kind: Kind, id: string): AppThunk<Promise<void>> =>
  async (dispatch) => {
    await TDX.queryID(kind, id)
      .then((data) => dispatch(setEntity(data[0])))
      .catch((error) => alert(error.message));
  };

/**
 * Query recommendations by the kind and the city properties
 * of the target entity.
 */
export const queryRecommendations =
  (): AppThunk<Promise<void>> => async (dispatch, getState) => {
    const { entity } = selectSight(getState());

    if (entity) {
      const { kind, city, id: excludedID } = entity;

      await TDX.query({ kind, city, filter: { excludedID }, limit: 4 })
        .then((result) => dispatch(setRecommendations(result)))
        .catch((error) => alert(error.message));
    }
  };
