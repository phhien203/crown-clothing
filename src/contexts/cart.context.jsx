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

function removeItemFromCartItems(cartItemToRemove, cartItems) {
  const existingItem = cartItems.find(
    (item) => item.id === cartItemToRemove.id
  );

  if (existingItem?.quantity === 1) {
    return cartItems.filter((item) => item.id !== cartItemToRemove.id);
  }

  return cartItems.map((item) => {
    if (item.id === cartItemToRemove.id) {
      return { ...item, quantity: item.quantity - 1 };
    }
    return item;
  });
}

function clearCartItem(cartItemToClear, cartItems) {
  return cartItems.filter((item) => item.id !== cartItemToClear.id);
}

export const CartContext = React.createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartItemCount: 0,
  cartTotal: 0,
});

export function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartItemCount, setCartItemCount] = React.useState(0);
  const [cartTotal, setCartTotal] = React.useState(0);

  React.useEffect(() => {
    const newCartCount = cartItems.reduce(
      (totalItems, cartItem) => totalItems + cartItem.quantity,
      0
    );
    setCartItemCount(newCartCount);
  }, [cartItems]);

  React.useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  function addItemToCart(productToAdd) {
    setCartItems(addProductToCartItems(productToAdd, cartItems));
  }

  function removeItemFromCart(cartItemToRemove) {
    setCartItems(removeItemFromCartItems(cartItemToRemove, cartItems));
  }

  function clearItemFromCart(cartItemToClear) {
    setCartItems(clearCartItem(cartItemToClear, cartItems));
  }

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartItemCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
