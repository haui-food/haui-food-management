import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const loginUser = createAsyncThunk('auth/login', async (userCredentials, { rejectWithValue }) => {
  try {
    const res = await callApi('POST', '/v1/auth/login', null, userCredentials);
    // console.log(res);
    // await sleep(5000);
    if (res.code === 200) {
      localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
      localStorage.setItem('refreshToken', JSON.stringify(res.data.refreshToken));
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }
    return res;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});
