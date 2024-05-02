import { createSlice } from '@reduxjs/toolkit';

import { loginUser } from '~/apiService/authService';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    user: null,
    isLogin: null,
    status: null,
    message: null,
  },

  extraReducers: (builder) => {
    builder

      //login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      });
  },
});
export default authSlice.reducer;
