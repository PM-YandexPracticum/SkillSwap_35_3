import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { logout } from '@/features/auth/slices/authSlice';

interface LikeState {
  likes: Record<string, boolean>;
}

const initialState: LikeState = {
  likes: {}
};

const likeSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    initializeLikes: (
      state,
      action: PayloadAction<Record<string, boolean>>
    ) => {
      state.likes = action.payload;
    },

    toggleLike: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.likes[id] = !state.likes[id];
    },

    setLike: (state, action: PayloadAction<{ id: string; liked: boolean }>) => {
      const { id, liked } = action.payload;
      state.likes[id] = liked;
    },

    clearAllLikes: (state) => {
      state.likes = {};
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.likes = {};
    });
  }
});

export const { initializeLikes, toggleLike, setLike, clearAllLikes } =
  likeSlice.actions;

export const selectLikes = (state: RootState) => state.likes.likes;

export const selectIsLiked = (id: string) => (state: RootState) =>
  Boolean(state.likes.likes[id]);

export const selectTotalLikes = (state: RootState) =>
  Object.keys(state.likes.likes).filter((id) => state.likes.likes[id]).length;

export const selectLikedItems = createSelector([selectLikes], (likes) =>
  Object.entries(likes)
    .filter(([, isLiked]) => isLiked)
    .map(([id]) => id)
);

export default likeSlice.reducer;
