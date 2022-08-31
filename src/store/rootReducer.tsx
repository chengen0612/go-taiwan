import { combineReducers } from "@reduxjs/toolkit";

import searchReducer from "./slices/search";
import entitiesReducer from "./slices/entities";

export default combineReducers({
  search: searchReducer,
  entities: entitiesReducer,
});
