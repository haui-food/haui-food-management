import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';

export const getOrders = createAsyncThunk('order/getAll', async (_, { rejectWithValue }) => {
  try {
    const res = await callApi('GET', `v1/shops/orders`, {}, {});
    return res;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});
