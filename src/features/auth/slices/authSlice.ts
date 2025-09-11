import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';
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
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(
        updateUserThunk.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.user = action.payload;

          localStorage.setItem('user', JSON.stringify(action.payload));
        }
      )
      .addMatcher(
        isAnyOf(
          loginUserThunk.pending,
          registerUserThunk.pending,
          updateUserThunk.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          loginUserThunk.fulfilled,
          registerUserThunk.fulfilled,
          updateUserThunk.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          loginUserThunk.rejected,
          registerUserThunk.rejected,
          updateUserThunk.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        }
      );
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
