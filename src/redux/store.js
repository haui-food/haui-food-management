import { configureStore } from '@reduxjs/toolkit';
import authSlice from '~/features/authSlice';
import userSlice from '~/features/userSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
});
