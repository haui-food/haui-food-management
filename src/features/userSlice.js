import { createSlice } from '@reduxjs/toolkit';
import {
  getAllUser,
  createUser,
  deleteUserById,
  updateUserById,
  getUserById,
  exportUsers,
} from '~/apiService/userService';

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
        state.message = action.payload.message;
      })
      .addCase(deleteUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(updateUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(exportUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(exportUsers.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload.data;
        // state.message = action.payload.message;
      })
      .addCase(exportUsers.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      });
  },
});

export default userSlice.reducer;
