import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPE } from "./categories.types";

export const setCategoriesList = (categories) =>
  createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES_LIST, categories);
