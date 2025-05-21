import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:7004/api", // backend url
});

// Add request interceptor to include auth token in requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const signUp = (userData) => API.post("/auth/signup", userData);
export const login = (userData) => API.post("/auth/login", userData);
export const logout = () => API.post("/auth/logout");
export const createPartnership = (partnershipData) =>
  API.post("/partnership", partnershipData);
