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
