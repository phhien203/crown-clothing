import React from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout-item.styles.scss";

export default function CheckoutItem({ cartItem }) {
  const { name, price, imageUrl, quantity } = cartItem;
  const { addItemToCart, removeItemFromCart, clearItemFromCart } =
    React.useContext(CartContext);

  return (
    <article className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>

      <span className="name">{name}</span>

      <span className="quantity">
        <span className="arrow" onClick={() => removeItemFromCart(cartItem)}>
          &#10094;
        </span>
        <span className="value">{quantity}</span>
        <span className="arrow" onClick={() => addItemToCart(cartItem)}>
          &#10095;
        </span>
      </span>

      <span className="price">{price}</span>

      <div
        className="remove-button"
        onClick={() => clearItemFromCart(cartItem)}
      >
        &#10005;
      </div>
    </article>
  );
}
