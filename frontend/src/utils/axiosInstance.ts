import axios from "axios";

const API_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.resolve(error.response.data)
);

export default axiosInstance;
