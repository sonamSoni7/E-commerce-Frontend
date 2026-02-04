import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getNotifications = async () => {
  const response = await axios.get(`${base_url}notifications`, config);
  return response.data;
};

const markAsRead = async (notificationId) => {
  const response = await axios.put(
    `${base_url}notifications/${notificationId}/read`,
    {},
    config
  );
  return response.data;
};

const markAllAsRead = async () => {
  const response = await axios.put(
    `${base_url}notifications/read-all`,
    {},
    config
  );
  return response.data;
};

const deleteNotification = async (notificationId) => {
  const response = await axios.delete(
    `${base_url}notifications/${notificationId}`,
    config
  );
  return response.data;
};

const notificationService = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};

export default notificationService;
