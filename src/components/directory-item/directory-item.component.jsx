import { Link } from "react-router-dom";
import "./directory-item.styles.scss";

export default function DirectoryItem({ url, category }) {
  const { imageUrl, title } = category;

  return (
    <Link to={url} className="directory-item-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      <div className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </Link>
  );
}
