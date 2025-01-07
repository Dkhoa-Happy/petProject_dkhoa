import axios from "axios";

const api = axios.create({
  baseURL: "https://gorest.co.in/public/v2/", // Base URL for the API
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    const token =
      "d64b146e4fe01bf47938781e4097653c6f7c61851c0b4f09d5dbc734625ea704";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error), // Handle request errors
);

export default api;
