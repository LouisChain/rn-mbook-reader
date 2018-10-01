import { combineReducers } from "redux";
import nav from "@reducers/nav";
import notifications from "@reducers/notifications";

const reducer = combineReducers({
  nav,
  notifications
});

export default reducer;
