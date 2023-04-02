import Button from "../button/button.component";
import "./product-card.styles.scss";

export default function ProductCard({ product }) {
  const { name, price, imageUrl } = product;

  return (
    <article className="product-card-container">
      <img src={imageUrl} alt={name} />
      <footer className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </footer>
      <Button buttonType="inverted">Add to cart</Button>
    </article>
  );
}
