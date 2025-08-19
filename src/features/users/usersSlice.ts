import { IUser } from '@/api/types';
import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { fetchUserByID, fetchUsers } from './usersThunks';

type UserState = {
  users: IUser[];
  selected: IUser | null;
  isLoading: boolean;
  error: SerializedError | null;
};

const initialState: UserState = {
  users: [],
  selected: null,
  isLoading: false,
  error: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearSelected(state) {
      state.selected = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(fetchUserByID.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserByID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selected = action.payload;
      })
      .addCase(fetchUserByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export const { clearSelected } = usersSlice.actions;
export default usersSlice.reducer;
