import { useEffect, useRef, useState } from "react";
import Container from "../Container/Container";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import SearchBar from "../SearchBar/SearchBar";

import useFetch from "../../hooks/useFetch";
import css from "./App.module.css";

const App = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { images, loadMore, fetchData, loading, error } = useFetch(query);
  const galleryContainerRef = useRef(null);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, [timeoutId]);

  const scrollTo = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(() => {
      if (images.length > 0 && galleryContainerRef.current) {
        const { height } = galleryContainerRef.current.getBoundingClientRect();
        window.scroll({
          top: height,
          left: 0,
          behavior: "smooth",
        });
      }
    }, 0);

    setTimeoutId(id);
  };

  const handleShowMore = async () => {
    await fetchData(query);
    scrollTo();
  };

  const onSubmit = async (query) => {
    setQuery(query);
    await fetchData(query, true);
  };

  const onImageClick = (image) => {
    setCurrentImage(image);
    setIsOpen(true);
  };

  const onModalClose = () => {
    setCurrentImage(null);
    setIsOpen(false);
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      <main className={css.main}>
        <Container>
          {error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            <ImageGallery
              images={images}
              onImageClick={onImageClick}
              ref={galleryContainerRef}
            />
          )}
          {loading && <Loader />}
          {loadMore && <LoadMoreBtn onClick={handleShowMore} />}
          {currentImage && (
            <ImageModal
              isOpen={isOpen}
              onClose={onModalClose}
              image={currentImage}
            />
          )}
        </Container>
      </main>
    </>
  );
};

export default App;
