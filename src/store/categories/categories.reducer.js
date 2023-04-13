import { CATEGORIES_ACTION_TYPE } from "./categories.types";

export const CATEGORIES_INITIAL_STATE = {
  categoriesList: [],
  isLoading: false,
  error: null,
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
    case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categoriesList: payload,
      };
    default:
      return state;
  }
}
