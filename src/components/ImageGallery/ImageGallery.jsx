import { forwardRef } from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = forwardRef(({ images, onImageClick }, ref) => {
  return (
    <ul className={css.container} ref={ref}>
      {images.map((image) => {
        return (
          <li key={image.id} className={css.imageCard}>
            <ImageCard image={image} onImageClick={onImageClick} />
          </li>
        );
      })}
    </ul>
  );
});

ImageGallery.displayName = "ImageGallery";

export default ImageGallery;
