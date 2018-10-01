import { createStore, applyMiddleware } from "redux";
import reducer from "@reducers";
import thunk from "redux-thunk";
import { navMiddleWare } from "@containers/themes";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

const persistConfig = {
  key: "root",
  storage,
  blacklist: ['nav']
};
const persistedReducer = persistReducer(persistConfig, reducer);
const middlewares = [thunk, navMiddleWare];
if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}
// export default createStore(persistedReducer, applyMiddleware(...middlewares));
export default () => {
  let store = createStore(persistedReducer, applyMiddleware(...middlewares));
  let persistor = persistStore(store);
  return { store, persistor };
};
