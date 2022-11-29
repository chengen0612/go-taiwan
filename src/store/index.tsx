import { configureStore } from "@reduxjs/toolkit";
import type { AnyAction, ThunkAction } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer";

export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppSelector<T> = (state: RootState) => T;
export type AppDispatch = typeof store.dispatch;

/** @see https://redux.js.org/usage/usage-with-typescript */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
