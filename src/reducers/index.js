import { combineReducers } from "redux";
import nav from "@reducers/nav";
import notifications from "@reducers/notifications";
import store from "@reducers/store"
import auth from "@reducers/auth"
import book from "@reducers/book"
import search from "@reducers/search"

const reducer = combineReducers({
  nav,
  notifications,
  store,
  auth,
  book,
  search
});

export default reducer;
