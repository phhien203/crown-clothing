import React from "react";
import { useDispatch } from "react-redux";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cart.slice";
import "./checkout-item.styles.scss";

export default function CheckoutItem({ cartItem }) {
  const dispatch = useDispatch();
  const { name, price, imageUrl, quantity } = cartItem;

  return (
    <article className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>

      <span className="name">{name}</span>

      <span className="quantity">
        <span
          className="arrow"
          onClick={() => dispatch(removeItemFromCart(cartItem))}
        >
          &#10094;
        </span>
        <span className="value">{quantity}</span>
        <span
          className="arrow"
          onClick={() => dispatch(addItemToCart(cartItem))}
        >
          &#10095;
        </span>
      </span>

      <span className="price">{price}</span>

      <div
        className="remove-button"
        onClick={() => dispatch(clearItemFromCart(cartItem))}
      >
        &#10005;
      </div>
    </article>
  );
}
