import React from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/categories.selector";

export default function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <React.Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.entries(categoriesMap).map(([title, products]) => {
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </React.Fragment>
  );
}
