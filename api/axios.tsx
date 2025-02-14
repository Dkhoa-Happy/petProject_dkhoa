import axios, { AxiosResponse } from "axios";

interface CustomAxiosResponse<T = any> extends AxiosResponse<T> {
  total?: number;
}

const api = axios.create({
  baseURL: "https://gorest.co.in/public/v2/",
});

api.interceptors.request.use(
  (config) => {
    const token =
      "d64b146e4fe01bf47938781e4097653c6f7c61851c0b4f09d5dbc734625ea704";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Extract Pagination Total from Response Headers
api.interceptors.response.use(
  (response) => {
    const customResponse = response as CustomAxiosResponse;
    customResponse.total = parseInt(
      response.headers["x-pagination-total"] || "0",
      10,
    );
    return customResponse;
  },
  (error) => Promise.reject(error),
);

export default api;
