import React from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";
import { CartIconContainer, ItemCount } from "./cart-icon.styles";

export default function CartIcon() {
  const { isCartOpen, setIsCartOpen, cartItemCount } =
    React.useContext(CartContext);

  function toggle() {
    setIsCartOpen(!isCartOpen);
  }

  return (
    <CartIconContainer onClick={toggle}>
      <ShoppingIcon />
      <ItemCount>{cartItemCount}</ItemCount>
    </CartIconContainer>
  );
}
