import axios from "axios";
const { VITE_UNSPLASH_ACCESS_KEY } = import.meta.env;

axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.params = { per_page: 15 };
axios.defaults.headers = {
  Authorization: `Client-ID ${VITE_UNSPLASH_ACCESS_KEY}`,
};

export const searchPhotos = async (query, { page = 1 }) => {
  const params = {
    query,
    page,
  };
  const response = await axios.get("/search/photos", { params });
  return response.data;
};
