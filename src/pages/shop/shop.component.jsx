import React from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { CategoriesContext } from "../../contexts/categories.context";
import "./shop.styles.scss";

export default function Shop() {
  const { categoriesMap } = React.useContext(CategoriesContext);

  return (
    <div className="shop-container">
      {Object.entries(categoriesMap).map(([title, products]) => {
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </div>
  );
}
