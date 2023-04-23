import { createSlice } from "@reduxjs/toolkit";

function clearCartItems(cartItemToClear, cartItems) {
  return cartItems.filter((item) => item.id !== cartItemToClear.id);
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

export const CART_INITIAL_STATE = {
  cartItems: [],
  isCartOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload;
    },
    clearItemFromCart(state, action) {
      state.cartItems = clearCartItems(action.payload, state.cartItems);
    },
    removeItemFromCart(state, action) {
      state.cartItems = removeItemFromCartItems(
        action.payload,
        state.cartItems
      );
    },
    addItemToCart(state, action) {
      state.cartItems = addProductToCartItems(action.payload, state.cartItems);
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  setIsCartOpen,
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} = cartSlice.actions;
