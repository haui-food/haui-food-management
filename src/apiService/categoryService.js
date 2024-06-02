import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';

export const getAllCategory = createAsyncThunk('category/getAll', async ({ limit, page }, { rejectWithValue }) => {
  try {
    const res = await callApi('GET', `/v1/categories?limit=${limit}&page=${page}`, {}, {});
    return res.data;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const createCategory = createAsyncThunk('category/create', async ({ name, image }, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'Content-Type': 'multipart/form-data',
      // Các header khác nếu cần
    };
    //  Tạo một đối tượng FormData
    const formData = new FormData();

    // Thêm name vào formData
    if (name) {
      formData.append('name', name);
    }

    // Thêm ảnh vào formData
    if (image) {
      formData.append('image', image);
    }

    const response = await callApi('post', `v1/categories`, null, formData, customHeaders);

    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const getCategoryById = createAsyncThunk('category/getById', async (categoryId, { rejectWithValue }) => {
  try {
    const res = await callApi('GET', `/v1/categories/${categoryId}`, {}, {});
    return res;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const updateCategoryById = createAsyncThunk(
  'category/updateById',
  async ({ categoryId, data }, { rejectWithValue }) => {
    try {
      const customHeaders = {
        'Content-Type': 'multipart/form-data',
        // Các header khác nếu cần
      };
      //  Tạo một đối tượng FormData
      const formData = new FormData();

      // Thêm data vào formData
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      const res = await callApi('PUT', `/v1/categories/${categoryId}`, null, formData, customHeaders);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteCategoryById = createAsyncThunk('category/deleteById', async (categoryId, { rejectWithValue }) => {
  try {
    const res = await callApi('DELETE', `/v1/categories/${categoryId}`, {}, {});
    return res;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
