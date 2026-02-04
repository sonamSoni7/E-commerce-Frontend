import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getPersonalizedRecommendations = async () => {
  const response = await axios.get(
    `${base_url}recommendations/personalized`,
    config
  );
  return response.data;
};

const getSimilarProducts = async (productId) => {
  const response = await axios.get(
    `${base_url}recommendations/similar/${productId}`
  );
  return response.data;
};

const getFrequentlyBought = async (productId) => {
  const response = await axios.get(
    `${base_url}recommendations/frequently-bought/${productId}`
  );
  return response.data;
};

const getBestSellers = async (category = "") => {
  const response = await axios.get(
    `${base_url}recommendations/best-sellers?category=${category}`
  );
  return response.data;
};

const getNewArrivals = async () => {
  const response = await axios.get(`${base_url}recommendations/new-arrivals`);
  return response.data;
};

const getTrending = async () => {
  const response = await axios.get(`${base_url}recommendations/trending`);
  return response.data;
};

const getDeals = async () => {
  const response = await axios.get(`${base_url}recommendations/deals`);
  return response.data;
};

const recommendationService = {
  getPersonalizedRecommendations,
  getSimilarProducts,
  getFrequentlyBought,
  getBestSellers,
  getNewArrivals,
  getTrending,
  getDeals,
};

export default recommendationService;
