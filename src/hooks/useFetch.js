import { useState } from "react";
import { searchPhotos } from "../api";

const START_PAGE = 1;

const useFetch = () => {
  const [page, setPage] = useState(START_PAGE);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const fetchData = async (query, shouldReset = false) => {
    try {
      setError("");
      setLoadMore(false);
      setLoading(true);

      let currentPage = page;

      if (shouldReset) {
        setImages([]);
        setPage(START_PAGE);
        currentPage = START_PAGE;
      }

      const { results, errors, total_pages } = await searchPhotos(query, {
        page: currentPage,
      });

      if (errors && Array.isArray(errors)) {
        setError(errors.join(", "));
        return;
      }

      if (results.length === 0) {
        setError(
          "Whoops, Tere are no results for your request. Try something else..."
        );
        return;
      }

      const nextPage = currentPage + 1;
      setImages((prevImages) => [...prevImages, ...results]);

      if (nextPage <= total_pages) {
        setLoadMore(true);
        setPage(nextPage);
      } else {
        setLoadMore(false);
      }
    } catch (error) {
      if (error.message) {
        setError(error.message);
      } else {
        setError("Whoops, something went wrong! Please try later!");
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, error, images, loading, loadMore };
};

export default useFetch;
