import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.styles";

export default function DirectoryItem({ url, category }) {
  const { imageUrl, title } = category;

  return (
    <DirectoryItemContainer to={url}>
      <BackgroundImage imageUrl={imageUrl} />

      <Body>
        <h2>{title.toUpperCase()}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
}
