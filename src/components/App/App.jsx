import { useState } from "react";
import Container from "../Container/Container";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import SearchBar from "../SearchBar/SearchBar";

const App = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {};

  const onSubmit = (value) => {
    setSearch(value);
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      <main>
        <Container>
          {error ? <ErrorMessage>{error}</ErrorMessage> : <ImageGallery />}
          {loading && <Loader />}
          {showMore && <LoadMoreBtn onClick={handleShowMore} />}
        </Container>
      </main>
    </>
  );
};

export default App;
