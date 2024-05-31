import { createSlice } from '@reduxjs/toolkit';
import { getOrdersByStatus } from '~/apiService/shopService';

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    loading: false,
    orders: null,
    status: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersByStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrdersByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersByStatus.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default shopSlice.reducer;
