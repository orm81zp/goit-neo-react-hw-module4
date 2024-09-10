import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = () => {
  return (
    <ul className={css.container}>
      <li>
        <ImageCard />
      </li>
    </ul>
  );
};

export default ImageGallery;
