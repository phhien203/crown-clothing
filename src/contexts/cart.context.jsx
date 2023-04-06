import React from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

const INITIAL_STATE = {
  cartItems: [],
  cartItemCount: 0,
  cartTotal: 0,
  isCartOpen: false,
};

export const CART_ACTION_TYPE = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

function cartReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPE.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPE.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled action type ${type} in cartReducer`);
  }
}

export function CartProvider({ children }) {
  const [{ isCartOpen, cartItemCount, cartItems, cartTotal }, dispatch] =
    React.useReducer(cartReducer, INITIAL_STATE);

  function updateCartItemsReducer(cartItems) {
    const newCartCount = cartItems.reduce(
      (totalItems, cartItem) => totalItems + cartItem.quantity,
      0
    );
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    const payload = {
      cartItems,
      cartTotal: newCartTotal,
      cartItemCount: newCartCount,
    };

    dispatch(createAction(CART_ACTION_TYPE.SET_CART_ITEMS, payload));
  }

  function addItemToCart(productToAdd) {
    const newCartItems = addProductToCartItems(productToAdd, cartItems);
    updateCartItemsReducer(newCartItems);
  }

  function removeItemFromCart(cartItemToRemove) {
    const newCartItems = removeItemFromCartItems(cartItemToRemove, cartItems);
    updateCartItemsReducer(newCartItems);
  }

  function clearItemFromCart(cartItemToClear) {
    const newCartItems = clearCartItem(cartItemToClear, cartItems);
    updateCartItemsReducer(newCartItems);
  }

  function setIsCartOpen(value) {
    dispatch(createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, value));
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
