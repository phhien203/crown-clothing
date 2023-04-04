import React from "react";
import { CartContext } from "../../contexts/cart.context";
import Button, { BUTTON_TYPE_CLASS } from "../button/button.component";
import "./product-card.styles.scss";

export default function ProductCard({ product }) {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = React.useContext(CartContext);

  function addToCart() {
    addItemToCart(product);
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
