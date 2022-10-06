/* eslint-disable no-param-reassign */
import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "#/store";

/* Main */
interface StatusState {
  loaded: boolean;
  isError: boolean;
  errorCode: number | undefined;
  errorMessage: string | undefined;
}

const initialState: StatusState = {
  loaded: false,
  isError: false,
  errorCode: undefined,
  errorMessage: undefined,
};

type SetErrorPayload = {
  code?: number;
  message: string;
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setLoaded(state, action: PayloadAction<boolean>) {
      state.loaded = action.payload;
    },

    setError(state, action: PayloadAction<SetErrorPayload>) {
      const { code, message } = action.payload;

      state.isError = true;
      state.errorCode = code;
      state.errorMessage = message;
    },

    reset() {
      return initialState;
    },
  },
});

export default statusSlice.reducer;

export const { setLoaded, setError, reset: resetStatus } = statusSlice.actions;

/* Selector */
export const selectStatus = (store: RootState) => store.status;

export const selectIsError = createSelector(
  selectStatus,
  (status) => status.isError
);

export const selectLoaded = (store: RootState) => store.status.loaded;
