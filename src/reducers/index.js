import { combineReducers } from "redux";
import nav from "@reducers/nav";
import notifications from "@reducers/notifications";
import store from "@reducers/store"

const reducer = combineReducers({
  nav,
  notifications,
  store
});

export default reducer;
