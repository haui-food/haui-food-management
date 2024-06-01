import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';

export const createUser = createAsyncThunk('user/create', async (userCredentials, { rejectWithValue }) => {
  try {
    const res = await callApi('POST', '/v1/users', null, userCredentials);
    return res;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const getAllUser = createAsyncThunk('user/getAll', async ({ limit, page }, { rejectWithValue }) => {
  try {
    const res = await callApi('GET', `/v1/users?limit=${limit}&page=${page}`, {}, {});
    console.log(res);
    return res.data;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const getUserById = createAsyncThunk('user/getById', async (userid, { rejectWithValue }) => {
  try {
    const res = await callApi('GET', `/v1/users/${userid}`, {}, {});
    return res;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const updateUserById = createAsyncThunk(
  'user/updateById',
  async ({ userid, userCredentials }, { rejectWithValue }) => {
    try {
      const res = await callApi('PUT', `/v1/users/${userid}`, {}, userCredentials);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteUserById = createAsyncThunk('user/deleteById', async (userid, { rejectWithValue }) => {
  try {
    const res = await callApi('DELETE', `/v1/users/${userid}`, {}, {});
    return res;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const exportUsers = createAsyncThunk('user/exportUsers', async (_, { rejectWithValue }) => {
  try {
    const res = await callApi('GET', `/v1/users/exports?`, {}, {});
    return res.data;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});
