import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';

export const getAllProduct = createAsyncThunk('product/getAll', async ({ limit, page }, { rejectWithValue }) => {
  try {
    const res = await callApi('GET', `/v1/products?limit=${limit}&page=${page}`, {}, {});
    console.log(res);
    return res.data;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const updateProduct = createAsyncThunk(
  'product/update',
  async ({ productData, avatar, productId }, { rejectWithValue }) => {
    try {
      const customHeaders = {
        'Content-Type': 'multipart/form-data',
        // Các header khác nếu cần
      };
      //  Tạo một đối tượng FormData
      const formData = new FormData();

      // Thêm dữ liệu người dùng vào formData
      Object.keys(productData).forEach((key) => {
        formData.append(key, productData[key]);
      });

      // Thêm ảnh vào formData
      if (avatar) {
        formData.append('avatar', avatar);
      }

      const response = await callApi('put', `v1/products/${productId}`, null, formData, customHeaders);

      return response;
    } catch (error) {
      return rejectWithValue({ ...error });
    }
  },
);

export const createProduct = createAsyncThunk(
  'product/create',
  async ({ productData, avatar }, { rejectWithValue }) => {
    try {
      const customHeaders = {
        'Content-Type': 'multipart/form-data',
        // Các header khác nếu cần
      };
      //  Tạo một đối tượng FormData
      const formData = new FormData();

      // Thêm dữ liệu người dùng vào formData
      Object.keys(productData).forEach((key) => {
        formData.append(key, productData[key]);
      });

      // Thêm ảnh vào formData
      if (avatar) {
        formData.append('avatar', avatar);
      }

      const response = await callApi('post', `v1/products`, null, formData, customHeaders);

      return response;
    } catch (error) {
      return rejectWithValue({ ...error });
    }
  },
);

export const deleteProductById = createAsyncThunk('product/deleteById', async (productId, { rejectWithValue }) => {
  try {
    const res = await callApi('DELETE', `/v1/categories/${productId}`, {}, {});
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});
