import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';

export const loginUser = createAsyncThunk('auth/login', async (userCredentials, { rejectWithValue }) => {
  try {
    const res = await callApi('POST', '/v1/auth/login', null, userCredentials);

    // console.log(res);

    if (res.code === 200 && ['admin', 'shop'].includes(res.data.user.role)) {
      localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
      localStorage.setItem('refreshToken', JSON.stringify(res.data.refreshToken));
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }
    return res;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});
