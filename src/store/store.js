import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducers } from "./root-reducer";

const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(
  Boolean
);
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

const persistedReducer = persistReducer(
  { key: "root", blacklist: ["user"], storage },
  rootReducers
);

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);
export const persistor = persistStore(store);
