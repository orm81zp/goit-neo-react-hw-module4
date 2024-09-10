import css from "./ImageCard.module.css";

const ImageCard = ({ image, onImageClick }) => {
  const {
    description,
    urls: { small },
  } = image;
  const handleClick = (event) => {
    event.preventDefault();
    onImageClick(image);
  };

  return (
    <a href="#" className={css.container} onClick={handleClick}>
      <img className={css.image} src={small} alt={description} />
    </a>
  );
};

export default ImageCard;
