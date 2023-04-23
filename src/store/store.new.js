import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddle from "redux-saga";
import { rootReducers } from "./root-reducer";
import { rootSaga } from "./root-saga";

const sagaMiddleWare = createSagaMiddle();

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleWare,
].filter(Boolean);

const persistedReducer = persistReducer(
  { key: "root", whitelist: ["cart"], storage },
  rootReducers
);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, thunk: false }).concat(
      middleWares
    ),
});

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
