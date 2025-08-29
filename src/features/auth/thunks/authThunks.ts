import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser, updateUser } from '@/api/mockApi';
import type { IUser } from '@/api/types';

export const loginUserThunk = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const user = await loginUser(email, password);
      const token = `mock-jwt-token-for-${user.id}`;

      return { user, token };
    } catch (err) {
      const error = err as Error;

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  'auth/register',
  async (newUser: Omit<IUser, 'id'>, thunkAPI) => {
    try {
      await registerUser(newUser);
      const { email, password } = newUser;

      const result = await thunkAPI.dispatch(
        loginUserThunk({ email, password })
      );

      if (loginUserThunk.fulfilled.match(result)) {
        return result.payload;
      }

      return thunkAPI.rejectWithValue(result.payload as string);
    } catch (err) {
      const error = err as Error;

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'auth/updateUser',
  async (
    { id, data }: { id: number; data: Partial<Omit<IUser, 'id'>> },
    thunkAPI
  ) => {
    try {
      const updatedUser = await updateUser(id, data);

      if (updatedUser) {
        return updatedUser;
      }
      return thunkAPI.rejectWithValue('Ошибка при обновлении профиля');
    } catch (err) {
      const error = err as Error;

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
