import React from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { selectCategoriesMap } from "../../store/categories/categories.selector";

export default function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <React.Fragment>
      {Object.entries(categoriesMap).map(([title, products]) => {
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </React.Fragment>
  );
}
