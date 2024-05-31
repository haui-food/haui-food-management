import axios from 'axios';
import { getLocalStorageItem, updateFieldInLocalStorage } from '~/utils/localStorage';
import { jwtDecode } from 'jwt-decode';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://api.hauifood.com/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để tự động gắn token vào header
axiosInstance.interceptors.request.use(async (config) => {
  const token = getLocalStorageItem('accessToken');
  if (token) {
    // const refreshToken = getLocalStorageItem('refreshToken');
    // const tokenDecoded = jwtDecode(token);
    // const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    // if (tokenDecoded.exp < currentTimeInSeconds) {
    //   // Token đã hết hạn, thực hiện làm mới token
    //   const res = await axiosInstance.post('/v1/auth/refresh-tokens', { refreshToken });
    //   const newAccessToken = res.data.data.accessToken;
    //   localStorage.setItem('accessToken', newAccessToken);
    //   config.headers['Authorization'] = `Bearer ${newAccessToken}`;
    // } else {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }

    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  function (response) {
    if (response.status === 202) {
    }
    return response.data;
  },

  function (error) {
    if (error.response) {
      const { code, message } = error.response.data;
      // console.log(error.response);
      return Promise.reject({ success: false, message: message, code: code });
    } else {
      // Nếu không có phản hồi từ máy chủ
      console.log(error);
      // Trả về một object có cấu trúc tùy chỉnh
      return Promise.reject({ success: false, message: 'Network error', code: 0 });
    }
  },
);

export default axiosInstance;
