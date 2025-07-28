import axios from "axios";
import { store } from "../store/store";

const api = axios.create({
  baseURL: "https://phplaravel-1483035-5638759.cloudwaysapps.com/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

api.interceptors.request.use(
  (config) => {
    const publicEndpoints = ["/login"]; // , "/register", "/forgot-password"
    const isPublicEndpoint = publicEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (!isPublicEndpoint) {
      const token = store.getState().auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("No authentication token found for protected endpoint");
      }
    }

    config.headers["Accept-Language"] = "en"; // store.getState().settings.lang  ;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.error("Unauthorized access - redirecting to login");
      } else if (error.response?.status === 403) {
        console.error("Forbidden access");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
