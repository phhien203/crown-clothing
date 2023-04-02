import React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../contexts/categories.context";
import "./category.styles.scss";

export default function Category() {
  const { category } = useParams();
  const { categoriesMap } = React.useContext(CategoriesContext);
  const [products, setProducts] = React.useState(categoriesMap[category]);
  console.log(products.length);

  React.useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <React.Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>

      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </React.Fragment>
  );
}
