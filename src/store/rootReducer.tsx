import { combineReducers } from "@reduxjs/toolkit";

import searchReducer from "./slices/search";
import entitiesReducer from "./slices/entities";
import sightReducer from "./slices/sight";
import favoriteReducer from "./slices/favorite";

export default combineReducers({
  search: searchReducer,
  entities: entitiesReducer,
  sight: sightReducer,
  favorite: favoriteReducer,
});
