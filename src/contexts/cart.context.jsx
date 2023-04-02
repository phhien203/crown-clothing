import React from "react";

export const CartContext = React.createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
});

export function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  return (
    <CartContext.Provider value={{ isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}
