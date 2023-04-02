import React from "react";

function addProductToCartItems(productToAdd, cartItems) {
  const existingItem = cartItems.find((item) => item.id === productToAdd.id);

  if (existingItem) {
    return cartItems.map((item) => {
      if (item.id === productToAdd.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
}

export const CartContext = React.createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartItemCount: 0,
});

export function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartItemCount, setCartItemCount] = React.useState(0);

  React.useEffect(() => {
    const newCartCount = cartItems.reduce(
      (totalItems, cartItem) => totalItems + cartItem.quantity,
      0
    );
    setCartItemCount(newCartCount);
  }, [cartItems]);

  function addItemToCart(productToAdd) {
    setCartItems(addProductToCartItems(productToAdd, cartItems));
  }

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
