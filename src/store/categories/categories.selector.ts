import { createSelector } from "reselect";
import { CategoriesState } from "./categories.reducer";
import { CategoryMap } from "./categories.types";

const selectCategories = (state: any): CategoriesState => state.categories;

export const selectCategoriesList = createSelector(
  [selectCategories],
  (categories) => {
    return categories.categoriesList;
  }
);

export const selectCategoriesMap = createSelector(
  [selectCategoriesList],
  (categoriesList): CategoryMap => {
    return categoriesList.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap);
  }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategories],
  (categories) => {
    return categories.isLoading;
  }
);
