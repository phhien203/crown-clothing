import React from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.slice";
import Button, { BUTTON_TYPE_CLASS } from "../button/button.component";
import "./product-card.styles.scss";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { name, price, imageUrl } = product;

  function addToCart() {
    dispatch(addItemToCart(product));
  }

  return (
    <article className="product-card-container">
      <img src={imageUrl} alt={name} />
      <footer className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </footer>
      <Button buttonType={BUTTON_TYPE_CLASS.inverted} onClick={addToCart}>
        Add to cart
      </Button>
    </article>
  );
}
