import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPE } from "./categories.types";

export const setCategoriesList = (categories) =>
  createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES_LIST, categories);

export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categories) =>
  createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFailed = (error) =>
  createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => {
  return async (dispatch) => {
    dispatch(fetchCategoriesStart());

    try {
      const categoryList = await getCategoriesAndDocuments();
      dispatch(fetchCategoriesSuccess(categoryList));
    } catch (error) {
      dispatch(fetchCategoriesFailed(error));
    }
  };
};
