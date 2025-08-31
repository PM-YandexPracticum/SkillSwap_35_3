import { combineReducers, configureStore } from '@reduxjs/toolkit';
import usersReducer from '@/entities/User/slices/usersSlice';
import skillsReducer from '@/entities/Skill/slices/skillsSlice';
import filtersReducer from '@/entities/Filters/model/filtersSlice';
import authReducer from '@/features/auth/slices/authSlice';
import likesReducer, {
  initializeLikes
} from '@/features/favorites/slices/likeSlice';
import {
  likesMiddleware,
  loadLikesFromStorage
} from '@/features/favorites/middleware/likesMiddleware';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  users: usersReducer,
  skills: skillsReducer,
  filters: filtersReducer,
  auth: authReducer,
  likes: likesReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(likesMiddleware)
});

const initialLikes = loadLikesFromStorage();
if (Object.keys(initialLikes).length > 0) {
  store.dispatch(initializeLikes(initialLikes));
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
