import { configureStore } from "@reduxjs/toolkit";
import type { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import rootReducer from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  /**
   * Add workaround to resolve non-serializable value warnings when using redux-persist.
   * @see https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
   */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

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
