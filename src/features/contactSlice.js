import { createSlice } from '@reduxjs/toolkit';
import { getAllContacts, getContactById, deleteContactById } from '~/apiService/contactService';

const contactSlide = createSlice({
  name: 'contact',
  initialState: {
    loading: false,
    contact: null,
    isLogin: null,
    status: null,
    message: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contact = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getAllContacts.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(getContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.contact = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getContactById.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.contact = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(deleteContactById.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      });
  },
});

export default contactSlide.reducer;
