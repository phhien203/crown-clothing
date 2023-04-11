import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPE } from "./cart.types";

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

export function addItemToCart(cartItems, productToAdd) {
  const newCartItems = addProductToCartItems(productToAdd, cartItems);
  return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
}

export function removeItemFromCart(cartItems, cartItemToRemove) {
  const newCartItems = removeItemFromCartItems(cartItemToRemove, cartItems);
  return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
}

export function clearItemFromCart(cartItems, cartItemToClear) {
  const newCartItems = clearCartItem(cartItemToClear, cartItems);
  return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
}

export function setIsCartOpen(value) {
  return createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, value);
}
