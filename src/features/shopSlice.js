import { createSlice } from '@reduxjs/toolkit';
import { getOrders } from '~/apiService/shopService';

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
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default shopSlice.reducer;
