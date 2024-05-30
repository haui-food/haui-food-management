import axios from 'axios';
import { getLocalStorageItem } from '~/utils/localStorage';

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
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  function (response) {
    // console.log(response);
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
