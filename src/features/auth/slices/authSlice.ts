import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '@/api/types';
import {
  loginUserThunk,
  updateUserThunk,
  registerUserThunk
} from '@/features/auth';

type AuthState = {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
};

const loadInitialState = (): AuthState => {
  try {
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;

    if (token && user) {
      return { user, token, isLoading: false, error: null };
    }
  } catch (err) {
    return { user: null, token: null, isLoading: false, error: null };
  }
  return { user: null, token: null, isLoading: false, error: null };
};

export const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        updateUserThunk.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.isLoading = false;
          state.user = action.payload;
        }
      )
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
