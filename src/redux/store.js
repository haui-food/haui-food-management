import { configureStore } from '@reduxjs/toolkit';
import authSlice from '~/features/authSlice';
import userSlice from '~/features/userSlice';
import categorySlice from '~/features/categorySlice';
import contactSlice from '~/features/contactSlice';
import shopSlice from '~/features/shopSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    category: categorySlice,
    contact: contactSlice,
    shop: shopSlice,
  },
});
