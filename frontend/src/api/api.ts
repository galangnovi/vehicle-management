import axios from "axios";
import { useAuthStore } from "../store/useAuth";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// Tambahtoken di setiap request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Kalau token expired (401), coba refresh token
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // kalau accessToken expired dan belum dicoba refresh
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // panggil backend /auth/refresh → kirim cookie refreshToken
        const res = await axios.post(
          "http://localhost:3000/auth/refresh",
          {},
          { withCredentials: true }
        );

        // ambil accessToken baru
        const newAccessToken = res.data.data.accessToken;
        const user = useAuthStore.getState().user;

        // update token di Zustand
        useAuthStore.getState().setAuth({ user: user!, accessToken: newAccessToken });

        // ulang request awal pakai token baru
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (error) {
        // gagal refresh → logout user
        useAuthStore.getState().logout();
      }
    }

    return Promise.reject(err);
  }
);

export default api;
