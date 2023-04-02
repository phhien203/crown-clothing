import React from "react";
import PRODUCTS from "../shop-data.json";

export const ProductsContext = React.createContext({
  products: [],
});

export function ProductsProvider({ children }) {
  const [products] = React.useState(PRODUCTS);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
}
