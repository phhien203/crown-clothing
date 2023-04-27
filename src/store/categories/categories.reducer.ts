import { AnyAction } from "redux";
import { Category } from "./categories.types";
import {
  fetchCategoriesFailed,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
} from "./categories.action";

export type CategoriesState = {
  readonly categoriesList: ReadonlyArray<Category>;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categoriesList: [],
  isLoading: false,
  error: null,
};

export function categoriesReducer(
  state = CATEGORIES_INITIAL_STATE,
  action = {} as AnyAction
): CategoriesState {
  if (fetchCategoriesStart.match(action)) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (fetchCategoriesSuccess.match(action)) {
    return {
      ...state,
      isLoading: false,
      categoriesList: action.payload,
    };
  }

  if (fetchCategoriesFailed.match(action)) {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  }

  return state;
}
