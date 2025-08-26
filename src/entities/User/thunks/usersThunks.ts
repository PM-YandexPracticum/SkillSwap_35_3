import { getUserById, getUsers } from '@/api/mockApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, thunkAPI) => {
    try {
      const data = await getUsers();
      return data;
    } catch (err) {
      const error = err as Error;
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserByID = createAsyncThunk(
  'users/fetchByID',
  async (id: number, thunkAPI) => {
    try {
      const user = await getUserById(id);
      return user;
    } catch (err) {
      const error = err as Error;
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
