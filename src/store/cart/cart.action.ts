import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/categories.types";
import { CART_ACTION_TYPE, CartItem } from "./cart.types";

function addProductToCartItems(
  productToAdd: CategoryItem,
  cartItems: CartItem[]
): CartItem[] {
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

function removeItemFromCartItems(
  cartItemToRemove: CartItem,
  cartItems: CartItem[]
): CartItem[] {
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

function clearCartItem(
  cartItemToClear: CartItem,
  cartItems: CartItem[]
): CartItem[] {
  return cartItems.filter((item) => item.id !== cartItemToClear.id);
}

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPE.SET_IS_CART_OPEN,
  boolean
>;
export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPE.SET_CART_ITEMS,
  CartItem[]
>;

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems => {
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, cartItems);
  }
);

export function addItemToCart(
  cartItems: CartItem[],
  productToAdd: CategoryItem
) {
  const newCartItems = addProductToCartItems(productToAdd, cartItems);
  return setCartItems(newCartItems);
}

export function removeItemFromCart(
  cartItems: CartItem[],
  cartItemToRemove: CartItem
) {
  const newCartItems = removeItemFromCartItems(cartItemToRemove, cartItems);
  return setCartItems(newCartItems);
}

export function clearItemFromCart(
  cartItems: CartItem[],
  cartItemToClear: CartItem
) {
  const newCartItems = clearCartItem(cartItemToClear, cartItems);
  return setCartItems(newCartItems);
}

export const setIsCartOpen = withMatcher((value: boolean): SetIsCartOpen => {
  return createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, value);
});
