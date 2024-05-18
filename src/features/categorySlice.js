import { createSlice } from '@reduxjs/toolkit';
import {
  getAllCategory,
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} from '~/apiService/categoryService';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    loading: false,
    category: null,
    isLogin: null,
    status: null,
    message: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(getCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(updateCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(updateCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(deleteCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      });
  },
});

export default categorySlice.reducer;
