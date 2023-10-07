import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.resolve(error.response.data)
);

export default axiosInstance;
