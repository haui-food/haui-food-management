import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';

export const getOrdersByStatus = createAsyncThunk('order/getAll', async ({ status }, { rejectWithValue }) => {
  try {
    const res = await callApi('GET', `/v1/shops/orders?status=${status}`, {}, {});
    return res;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});
