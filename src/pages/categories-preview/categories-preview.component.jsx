import React from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { CategoriesContext } from "../../contexts/categories.context";

export default function CategoriesPreview() {
  const { categoriesMap } = React.useContext(CategoriesContext);

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
