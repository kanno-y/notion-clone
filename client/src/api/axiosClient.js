import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";
const axiosClient = axios.create({
  baseURL: BASE_URL,
});
const getToken = () => localStorage.getItem("token");

// APIを叩く前に前処理を行おこなう
axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`, // リクエストヘッダにJWTをつけてサーバーに渡す
    },
  };
});

axiosClient.interceptors.response.use(
  async (response) => {
    return response.data;
  },
  (err) => {
    throw err.response;
  }
);

export default axiosClient;
