/* eslint-disable no-param-reassign */
import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";

import { normalize, Normalized } from "#/utils/helpers/normalize";
import TDX from "#/services/tdx";
import { Kind } from "#/utils/constants/kind";
import { selectSearch } from "./search";
import { setLoaded, setError } from "./status";

import type { RootState, AppDispatch } from "#/store";
import type { KindEntityMap, AnyEntity } from "#/utils/models/entity";
import { AnonymousError } from "#/utils/models/base";

/* Main */
type EntitiesState = {
  [Property in Kind]: Normalized<KindEntityMap[Property]>;
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
    setPartial(state, action: PayloadAction<AnyEntity[]>) {
      const entities = action.payload;

      if (entities.length > 0) {
        const [firstEntity] = entities;
        const { kind } = firstEntity;

        return { ...state, [kind]: normalize<AnyEntity>(entities) };
      }

      return state;
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

const { setPartial, setAll, reset: resetEntities } = entitiesSlice.actions;

export default entitiesSlice.reducer;
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
/**
 * An abstract layer to switch query thunks by search.kind.
 * It is designed to hide the api switching logic from ui component.
 */
export const loadEntities =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { kind, city, keyword } = selectSearch(getState());

    dispatch(setLoaded(false));

    try {
      if (kind !== "all") {
        const data = await TDX.query({ kind, city, filter: { keyword } });
        dispatch(setPartial(data));
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
