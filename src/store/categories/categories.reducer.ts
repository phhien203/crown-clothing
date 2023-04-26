import { CATEGORIES_ACTION_TYPE, Category } from "./categories.types";
import { CategoriesAction } from "./categories.action";

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
  action = {} as CategoriesAction
): CategoriesState {
  switch (action.type) {
    case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categoriesList: action.payload,
      };
    default:
      return state;
  }
}
