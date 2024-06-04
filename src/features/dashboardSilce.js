import { createSlice } from '@reduxjs/toolkit';
import { getStatisticalData, getStatisticalRevenue, getStatisticalPerformance } from '~/apiService/dashboardService';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    loading: false,
    dashboard: null,
    isLogin: null,
    status: null,
    message: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStatisticalData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStatisticalData.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getStatisticalData.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(getStatisticalRevenue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStatisticalRevenue.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getStatisticalRevenue.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(getStatisticalPerformance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStatisticalPerformance.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getStatisticalPerformance.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      });
  },
});

export default dashboardSlice.reducer;
