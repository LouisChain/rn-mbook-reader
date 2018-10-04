import { combineReducers } from "redux";
import nav from "@reducers/nav";
import notifications from "@reducers/notifications";
import store from "@reducers/store"
import auth from "@reducers/auth"

const reducer = combineReducers({
  nav,
  notifications,
  store,
  auth
});

export default reducer;
