import React from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";
import "./cart-icon.styles.scss";

export default function CartIcon() {
  const { isCartOpen, setIsCartOpen, cartItemCount } =
    React.useContext(CartContext);

  function toggle() {
    setIsCartOpen(!isCartOpen);
  }

  return (
    <div className="cart-icon-container" onClick={toggle}>
      <ShoppingIcon />
      <span className="item-count">{cartItemCount}</span>
    </div>
  );
}
