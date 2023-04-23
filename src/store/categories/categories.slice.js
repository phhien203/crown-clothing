import { createSlice } from "@reduxjs/toolkit";

export const CATEGORIES_INITIAL_STATE = {
  categoriesList: [],
  isLoading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    fetchCategoriesStart(state) {
      state.isLoading = true;
      state.categoriesList = [];
      state.error = null;
    },
    fetchCategoriesFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.categoriesList = action.payload;
      state.error = null;
    },
  },
});

export const categoriesReducer = categoriesSlice.reducer;

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} = categoriesSlice.actions;
