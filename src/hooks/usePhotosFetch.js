import { useState } from "react";
import { searchPhotos } from "../api";

const initialPage = 1;
const initialState = [];

const usePhotosFetch = () => {
  const [page, setPage] = useState(initialPage);
  const [error, setError] = useState("");
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const fetchData = async (query, initialFetch = false) => {
    try {
      let currentPage = page;

      setError("");
      setLoadMore(false);
      setLoading(true);

      if (initialFetch) {
        setPage(initialPage);
        setData(initialState);
        currentPage = initialPage;
      }

      const { results, errors, total_pages } = await searchPhotos(query, {
        page: currentPage,
      });

      if (errors && Array.isArray(errors)) {
        setError(errors.join(". "));
        return;
      } else if (results.length === 0) {
        setError(
          "Whoops, Tere are no results for your request. Try something else..."
        );
        return;
      }

      setData((prevData) => [...prevData, ...results]);
      const nextPage = currentPage + 1;

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

  return { fetchData, error, data, loading, loadMore };
};

export default usePhotosFetch;
