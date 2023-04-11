import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import Button, { BUTTON_TYPE_CLASS } from "../button/button.component";
import "./product-card.styles.scss";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems);

  function addToCart() {
    dispatch(addItemToCart(cartItems, product));
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
