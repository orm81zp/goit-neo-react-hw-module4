import css from "./ImageCard.module.css";

const ImageCard = ({ image, onImageClick }) => {
  const {
    description,
    alt_description,
    urls: { small },
  } = image;
  const alt = alt_description || description;

  const handleClick = (event) => {
    event.preventDefault();
    onImageClick(image);
  };

  return (
    <a href="#" className={css.container} onClick={handleClick}>
      <img className={css.image} src={small} alt={alt} />
    </a>
  );
};

export default ImageCard;
