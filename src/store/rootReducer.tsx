import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import searchReducer from "./slices/search";
import entitiesReducer from "./slices/entities";
import sightReducer from "./slices/sight";
import favoriteReducer from "./slices/favorite";
import statusReducer from "./slices/status";

const favoritePersistConfig = {
  key: "favorite",
  storage,
};

export default combineReducers({
  search: searchReducer,
  entities: entitiesReducer,
  sight: sightReducer,
  favorite: persistReducer(favoritePersistConfig, favoriteReducer),
  status: statusReducer,
});
