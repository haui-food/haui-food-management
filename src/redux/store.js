import { configureStore } from '@reduxjs/toolkit';
import authSlice from '~/features/authSlice';
import userSlice from '~/features/userSlice';
import shopSlice from '~/features/shopSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    shop: shopSlice,
  },
});
