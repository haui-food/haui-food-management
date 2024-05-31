import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';

export const getAllContacts = createAsyncThunk('contact/getAll', async ({ limit, page }, { rejectWithValue }) => {
  try {
    const res = await callApi('GET', `/v1/contacts?limit=${limit}&page=${page}`, {}, {});
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getContactById = createAsyncThunk('contact/getById', async (contactId, { rejectWithValue }) => {
  try {
    const res = await callApi('GET', `/v1/contacts/${contactId}`, {}, {});
    return res;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const deleteContactById = createAsyncThunk('contact/deleteById', async (contactId, { rejectWithValue }) => {
  try {
    const res = await callApi('DELETE', `/v1/Contacts/${contactId}`, {}, {});
    return res;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
