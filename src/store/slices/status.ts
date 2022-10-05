/* eslint-disable no-param-reassign */
import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "#/store";

/* Main */
interface StatusState {
  isError: boolean;
  errorCode: number | undefined;
  errorMessage: string | undefined;
}

const initialState: StatusState = {
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

export const { setError, reset: resetStatus } = statusSlice.actions;

/* Selector */
export const selectStatus = (store: RootState) => store.status;

export const selectIsError = createSelector(
  selectStatus,
  (status) => status.isError
);
