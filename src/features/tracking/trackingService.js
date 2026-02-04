import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getOrderTracking = async (orderId) => {
  const response = await axios.get(
    `${base_url}order-tracking/${orderId}/track`,
    config
  );
  return response.data;
};

const getLiveLocation = async (orderId) => {
  const response = await axios.get(
    `${base_url}order-tracking/${orderId}/live`,
    config
  );
  return response.data;
};

const cancelOrder = async (orderId, reason) => {
  const response = await axios.put(
    `${base_url}order-tracking/${orderId}/cancel`,
    { reason },
    config
  );
  return response.data;
};

const trackingService = {
  getOrderTracking,
  getLiveLocation,
  cancelOrder,
};

export default trackingService;
