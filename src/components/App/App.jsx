import { useState } from "react";
import { searchPhotos } from "../../api";
import Container from "../Container/Container";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import SearchBar from "../SearchBar/SearchBar";

const App = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [options, setOptions] = useState({ query: "", page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = async () => {
    try {
      setLoading(true);
      const { page, query } = options;
      const nextPage = page + 1;
      const { results, total_pages } = await searchPhotos(query, {
        page,
      });
      setImages([...images, ...results]);
      setOptions({
        ...options,
        totalPages: total_pages,
        page: nextPage,
      });

      if (nextPage < total_pages) {
        setShowMore(true);
      }
    } catch (error) {
      setError("Whoops, something went wrong! Please try later!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (query) => {
    try {
      setLoading(true);
      setImages([]);
      const { page } = options;
      const { results, total_pages } = await searchPhotos(query, { page });
      const nextPage = page + 1;
      setImages(results);
      setOptions({
        totalPages: total_pages,
        page: nextPage,
        query,
      });

      if (nextPage < total_pages) {
        setShowMore(true);
      }
    } catch (error) {
      setError("Whoops, something went wrong! Please try later!");
      console.log(error);
    } finally {
      setLoading(false);
    }
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
      <main>
        <Container>
          {error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            <ImageGallery images={images} onImageClick={onImageClick} />
          )}
          {loading && <Loader />}
          {showMore && <LoadMoreBtn onClick={handleShowMore} />}
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
