import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';

// export const loginUser = createAsyncThunk('auth/login', async (userCredentials, { rejectWithValue }) => {
//   try {
//     const res = await callApi('POST', '/v1/auth/login', null, userCredentials);

//     // console.log(res);

//     if (res.code === 200 && ['admin', 'shop'].includes(res.data.user.role)) {
//       localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
//       localStorage.setItem('refreshToken', JSON.stringify(res.data.refreshToken));
//       localStorage.setItem('user', JSON.stringify(res.data.user));
//     }
//     return res;
//   } catch (error) {
//     return rejectWithValue({ ...error });
//   }
// });

export const createUser = createAsyncThunk('user/create', async (userCredentials, { rejectWithValue }) => {
  try {
    const res = await callApi('POST', '/v1/users', null, userCredentials);

    console.log(res.data);
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const getAllUser = createAsyncThunk('user/getAll', async (_, { rejectWithValue }) => {
  try {
    const res = await callApi('GET', '/v1/users');
    // console.log(res);
    return res.data;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const deleteUserById = createAsyncThunk('user/deleteById', async (userid, { rejectWithValue }) => {
  try {
    const res = await callApi('DELETE', '/v1/users/' + userid);
    console.log(res.data);
  } catch (error) {
    rejectWithValue({ ...error });
  }
});
