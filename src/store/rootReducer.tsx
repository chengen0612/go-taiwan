import { combineReducers } from "@reduxjs/toolkit";

import searchReducer from "#/store/slices/search";

export default combineReducers({
  search: searchReducer,
});
