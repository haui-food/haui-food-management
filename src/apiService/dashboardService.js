import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';

export const getStatisticalData = createAsyncThunk(
  'dashboard/getStatisticalData',
  async (statisticalBy, { rejectWithValue }) => {
    try {
      const res = await callApi('POST', `/v1/dashboards/statistical-data`, null, statisticalBy);
      return res;
    } catch (error) {
      return rejectWithValue({ ...error });
    }
  },
);

export const getStatisticalRevenue = createAsyncThunk(
  'dashboard/getStatisticalRevenue',
  async (statisticalBy, { rejectWithValue }) => {
    try {
      const res = await callApi('POST', `/v1/dashboards/statistical-revenue`, {}, statisticalBy);
      console.log(typeof statisticalBy);
      return res;
    } catch (error) {
      return rejectWithValue({ ...error });
    }
  },
);

export const getStatisticalPerformance = createAsyncThunk(
  'dashboard/getStatisticalPerformance',
  async (statisticalBy, { rejectWithValue }) => {
    try {
      const res = await callApi('POST', `/v1/dashboards/statistical-performance`, {}, statisticalBy);
      console.log(typeof statisticalBy);
      return res;
    } catch (error) {
      return rejectWithValue({ ...error });
    }
  },
);