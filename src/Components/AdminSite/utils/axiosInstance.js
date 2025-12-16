import axios from 'axios';
import Cookies from 'js-cookie';
import * as API from '../../Endpoint/Endpoint';
import { setAccessTokenWithExpiry } from './tokenUtils';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get('refreshToken');

      if (!refreshToken) {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = '/';
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(API.REFRESH_TOKEN, { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = res.data;

        setAccessTokenWithExpiry(accessToken);

        if (newRefreshToken) {
          Cookies.set('refreshToken', newRefreshToken, {
            expires: 7,
            path: '/',
            sameSite: 'Lax',
          });
        }

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = '/';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
