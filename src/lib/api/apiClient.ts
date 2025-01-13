import axios from "axios";
import Cookies from "js-cookie";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL
});

// Add an interceptor to include the accessToken in the Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors and refresh the access token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is 401 and the request has not been retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refreshToken");

      if (!refreshToken) {
        return Promise.reject(error); // No refresh token available
      }

      try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/refresh`, {
          refreshToken
        });

        // Store the new access token
        const newAccessToken = response.data.accessToken;
        Cookies.set("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
