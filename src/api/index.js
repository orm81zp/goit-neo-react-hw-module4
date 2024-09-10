import axios from "axios";

const { VITE_UNSPLASH_ACCESS_KEY } = import.meta.env;

import { MOCK_DATA } from "./const";

axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers = {
  Authorization: `Client-ID ${VITE_UNSPLASH_ACCESS_KEY}`,
};

export const searchPhotos = async (query, { page = 1 }) => {
  return MOCK_DATA;
  const params = {
    query,
    page,
    per_page: 15,
  };
  const response = await axios.get("/search/photos", { params });
  return response.data;
};
