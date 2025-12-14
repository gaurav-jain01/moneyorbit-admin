import axios from "axios";
import { API_CONFIG } from "./api.config";

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
