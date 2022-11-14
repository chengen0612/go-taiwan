/* eslint-disable no-param-reassign */
import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "#/store";
import { ErrorBody } from "#/utils/models/base";

/* Main */
interface StatusState {
  loaded: boolean;
  isError: boolean;
  error?: ErrorBody;
}

const initialState: StatusState = {
  loaded: false,
  isError: false,
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setLoaded(state, action: PayloadAction<boolean>) {
      state.loaded = action.payload;
    },

    setError(state, action: PayloadAction<ErrorBody>) {
      const error = action.payload;

      state.isError = true;
      state.error = error;
    },

    reset() {
      return initialState;
    },
  },
});

const { setLoaded, setError, reset: resetStatus } = statusSlice.actions;

export default statusSlice.reducer;
export { setLoaded, setError, resetStatus };

/* Selector */
export const selectStatus = (store: RootState) => store.status;

export const selectIsError = createSelector(
  selectStatus,
  (status) => status.isError
);

export const selectLoaded = (store: RootState) => store.status.loaded;
