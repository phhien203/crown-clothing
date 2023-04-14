import { createSelector } from "reselect";

const selectCategories = (state) => state.categories;

export const selectCategoriesList = createSelector(
  [selectCategories],
  (categories) => {
    return categories.categoriesList;
  }
);

export const selectCategoriesMap = createSelector(
  [selectCategoriesList],
  (categoriesList) => {
    return categoriesList.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategories],
  (categories) => {
    return categories.isLoading;
  }
);
