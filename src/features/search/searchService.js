import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const searchProducts = async (query) => {
  const response = await axios.get(`${base_url}search?q=${query}`);
  return response.data;
};

const getSearchSuggestions = async (query) => {
  const response = await axios.get(`${base_url}search/suggestions?q=${query}`);
  return response.data;
};

const getTrendingSearches = async () => {
  const response = await axios.get(`${base_url}search/trending`);
  return response.data;
};

const filterProducts = async (filters) => {
  const params = new URLSearchParams(filters).toString();
  const response = await axios.get(`${base_url}search/filter?${params}`);
  return response.data;
};

const searchService = {
  searchProducts,
  getSearchSuggestions,
  getTrendingSearches,
  filterProducts,
};

export default searchService;
