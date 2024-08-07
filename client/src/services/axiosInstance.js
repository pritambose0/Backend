import axios from "axios";
import config from "../config/config";

const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true, // Include cookies in requests
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post(`${config.baseUrl}/users/refresh-token`, {
          withCredentials: true,
        });
        return axiosInstance(originalRequest);
      } catch (e) {
        console.log(e);
      }
    }
    return Promise.reject(error.message);
  }
);

export default axiosInstance;
