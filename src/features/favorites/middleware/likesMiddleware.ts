import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

const LIKES_STORAGE_KEY = 'skillswap-likes';

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

export const loadLikesFromStorage = (): Record<string, boolean> => {
  try {
    const stored = localStorage.getItem(LIKES_STORAGE_KEY);
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

export const clearLikesFromStorage = (): void => {
  try {
    localStorage.removeItem(LIKES_STORAGE_KEY);
  } catch (error) {
    console.warn('Не удалось очистить сохраненные лайки:', error);
  }
};
