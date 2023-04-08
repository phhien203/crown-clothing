import { applyMiddleware, compose, createStore } from "redux";
import { rootReducers } from "./root-reducer";
import logger from "redux-logger";

const myLogger = function (store) {
  return function (next) {
    return function (action) {
      if (!action.type) {
        return next(action);
      }

      console.log(`type:`, action.type);
      console.log(`payload:`, action.payload);
      console.log(`current state:`, store.getState());

      next(action);
    };
  };
};

const middleWares = [logger];
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducers, undefined, composedEnhancers);
