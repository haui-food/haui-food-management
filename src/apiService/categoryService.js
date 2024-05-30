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

export const createCategory = createAsyncThunk('category/create', async (userCredentials, { rejectWithValue }) => {
  try {
    const res = await callApi('POST', '/v1/categories', null, userCredentials);
    return res;
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
  async ({ categoryId, categoryCredentials }, { rejectWithValue }) => {
    try {
      const res = await callApi('PUT', `/v1/categories/${categoryId}`, null, categoryCredentials);
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
