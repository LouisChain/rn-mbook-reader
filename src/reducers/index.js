import { combineReducers } from "redux";
import nav from "@reducers/nav";
import notifications from "@reducers/notifications";
import store from "@reducers/store"
import auth from "@reducers/auth"
import book from "@reducers/book"

const reducer = combineReducers({
  nav,
  notifications,
  store,
  auth,
  book
});

export default reducer;
