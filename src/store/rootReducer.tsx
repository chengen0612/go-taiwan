import { combineReducers } from "@reduxjs/toolkit";

import searchReducer from "./slices/search";
import entitiesReducer from "./slices/entities";
import sightReducer from "./slices/sight";

export default combineReducers({
  search: searchReducer,
  entities: entitiesReducer,
  sight: sightReducer,
});
