import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

interface LikeState {
  likes: Record<string, boolean>;
}

const LIKES_STORAGE_KEY = 'skillswap-likes';

const getLikesStorageKey = (userId?: number | string) => {
  return userId ? `skillswap-likes-${userId}` : 'skillswap-likes';
};

export const likesMiddleware: Middleware<Record<string, never>, RootState> =
  (store) => (next) => (action) => {
    const result = next(action);

    if (
      typeof action === 'object' &&
      action !== null &&
      'type' in action &&
      typeof (action as Record<string, unknown>).type === 'string' &&
      (action as Record<string, string>).type.startsWith('likes/')
    ) {
      const state = store.getState();
      const likesState = state.likes;
      const userId = state.auth.user?.id;

      saveLikesToStorage(likesState, userId);

      try {
        localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likesState));
      } catch (error) {
        console.warn(
          'Не удалось сохранить состояние лайков в localStorage:',
          error
        );
      }
    }

    return result;
  };

export const loadLikesFromStorage = (
  userId?: number | string
): Record<string, boolean> => {
  try {
    const key = getLikesStorageKey(userId);
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.likes || {};
    }
  } catch (error) {
    console.warn(
      'Не удалось загрузить состояние лайков из localStorage:',
      error
    );
  }

  return {};
};

export const saveLikesToStorage = (
  likesState: LikeState,
  userId?: number | string
) => {
  try {
    const key = getLikesStorageKey(userId);
    localStorage.setItem(key, JSON.stringify(likesState));
  } catch (error) {
    console.warn('Не удалось сохранить лайки:', error);
  }
};

export const clearLikesFromStorage = (): void => {
  try {
    localStorage.removeItem(LIKES_STORAGE_KEY);
  } catch (error) {
    console.warn('Не удалось очистить сохраненные лайки:', error);
  }
};
