import { createSlice } from '@reduxjs/toolkit';
import { getAllUser, createUser, deleteUserById } from '~/apiService/userService';

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
        state.user = action.payload;
        state.message = action.payload.message;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        // console.log(action)
        state.message = action.payload.message;
      })
      .addCase(deleteUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload;
        // state.message = action.payload.message;
        console.log(action);
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        console.log(action);
      });
  },
});

export default userSlice.reducer;
