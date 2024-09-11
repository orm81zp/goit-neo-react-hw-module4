import { useRef, useState } from "react";
import usePhotosFetch from "../../hooks/usePhotosFetch";
import useScroll from "../../hooks/useScroll";
import Container from "../Container/Container";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";

const App = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const galleryContainerRef = useRef(null);
  const { data, loadMore, fetchData, loading, error } = usePhotosFetch();
  const { scrollTo } = useScroll(galleryContainerRef);

  const handleLoadMore = async () => {
    await fetchData(query);
    scrollTo();
  };

  const handleSearchSubmit = async (query) => {
    setQuery(query);
    await fetchData(query, true);
  };

  const onImageClick = (image) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setCurrentImage(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />
      <main className={css.main}>
        <Container>
          {error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            <ImageGallery
              images={data}
              onImageClick={onImageClick}
              ref={galleryContainerRef}
            />
          )}
          {loading && <Loader />}
          {loadMore && <LoadMoreBtn onClick={handleLoadMore} />}
          {currentImage && (
            <ImageModal
              isOpen={isModalOpen}
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
