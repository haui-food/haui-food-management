import { createSlice } from '@reduxjs/toolkit';
import { getAllUser, createUser } from '~/apiService/userService';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    user: null,
    isLogin: null,
    status: null,
    message: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload.data;
        console.log(action.payload);
        // state.message = action.payload.message;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      });
  },
});

export default userSlice.reducer;
