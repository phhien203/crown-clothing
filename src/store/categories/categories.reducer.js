import { CATEGORIES_ACTION_TYPE } from "./categories.types";

export const CATEGORIES_INITIAL_STATE = {
  categoriesList: [],
};

export function categoriesReducer(
  state = CATEGORIES_INITIAL_STATE,
  action = {}
) {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPE.SET_CATEGORIES_LIST:
      return {
        ...state,
        categoriesList: payload,
      };
    default:
      return state;
  }
}
