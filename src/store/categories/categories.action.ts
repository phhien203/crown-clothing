import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  createAction,
  Action,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPE, Category } from "./categories.types";

export type FetchCategoriesStart =
  Action<CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<
  CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS,
  Category[]
>;

export type FetchCategoriesFailed = ActionWithPayload<
  CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED,
  Error
>;

export type CategoriesAction =
  | FetchCategoriesStart
  | FetchCategoriesSuccess
  | FetchCategoriesFailed;

export const setCategoriesList = (categories: Category[]) =>
  createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES_LIST, categories);

export const fetchCategoriesStart = (): FetchCategoriesStart =>
  createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (
  categories: Category[]
): FetchCategoriesSuccess =>
  createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFailed = (error: Error): FetchCategoriesFailed =>
  createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => {
  return async (dispatch: any) => {
    dispatch(fetchCategoriesStart());

    try {
      const categoryList: any = await getCategoriesAndDocuments();
      dispatch(fetchCategoriesSuccess(categoryList));
    } catch (error: unknown) {
      dispatch(fetchCategoriesFailed(error as Error));
    }
  };
};
