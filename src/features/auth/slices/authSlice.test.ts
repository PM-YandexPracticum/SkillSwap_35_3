import { describe, expect, test } from '@jest/globals';

import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk
} from '@/features/auth';

import authReducer, { initialState, logout } from './authSlice';

import type { IUser } from '@/api/types';

const localStorageMock = (() => {
  let store: {
    [key: string]: string;
  } = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

const mockUser: IUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  gender: 'male',
  password: '123456',
  about: 'about',
  avatar: 'avatar',
  birthDate: '1995-05-11',
  city: 'Moscow',
  teachingSkillId: 1,
  learningSkillIds: [2, 3, 4, 5]
};

describe('authSlice', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('возвращаем начальное состояние', () => {
    const state = authReducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  describe('loginUserThunk', () => {
    test('проверяем начало авторизации пользователя', () => {
      const action = { type: loginUserThunk.pending.type };
      const newState = authReducer(initialState, action);

      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBeNull();
    });

    test('проверяем успешную авторизацию пользователя и запись в localStorage', () => {
      const action = {
        type: loginUserThunk.fulfilled.type,
        payload: { user: mockUser, token: 'token' }
      };
      const newState = authReducer(initialState, action);

      expect(newState.isLoading).toBe(false);
      expect(newState.user).toEqual(mockUser);
      expect(newState.token).toBe('token');

      expect(localStorage.getItem('token')).toBe('token');
      expect(localStorage.getItem('user')).toBe(JSON.stringify(mockUser));
    });

    test('проверяем ошибку авторизации пользователя', () => {
      const errorMessage = 'Неправильный логин или пароль';
      const action = {
        type: loginUserThunk.rejected.type,
        payload: errorMessage
      };
      const newState = authReducer(initialState, action);

      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(errorMessage);
      expect(newState.user).toBeNull();
    });
  });

  describe('logout reducer', () => {
    test('должен сбрасывать состояние пользователя и токен', () => {
      const loggedInState = {
        user: mockUser,
        token: 'mock-token',
        isLoading: false,
        error: null
      };

      const nextState = authReducer(loggedInState, logout());

      expect(nextState.user).toBeNull();
      expect(nextState.token).toBeNull();
    });

    test('должен удалять данные из localStorage при logout', () => {
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'mock-token');

      authReducer(initialState, logout());

      expect(localStorage.getItem('user')).toBeNull();
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  describe('registerUserThunk', () => {
    test('проверяем начало регистрации пользователя', () => {
      const action = { type: registerUserThunk.pending.type };
      const newState = authReducer(initialState, action);

      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBeNull();
    });
    test('проверяем успешную регистрацию и запись в localStorage', () => {
      const action = {
        type: registerUserThunk.fulfilled.type,
        payload: { user: mockUser, token: 'reg-token' }
      };
      const newState = authReducer(initialState, action);

      expect(newState.isLoading).toBe(false);
      expect(newState.user).toEqual(mockUser);
      expect(newState.token).toBe('reg-token');

      expect(localStorage.getItem('token')).toBe('reg-token');
      expect(localStorage.getItem('user')).toBe(JSON.stringify(mockUser));
    });
    test('проверяем ошибку регистрации пользователя', () => {
      const errorMessage = 'Email уже используется другим пользователем';
      const action = {
        type: registerUserThunk.rejected.type,
        payload: errorMessage
      };
      const newState = authReducer(initialState, action);

      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(errorMessage);
      expect(newState.user).toBeNull();
    });
  });

  describe('updateUserThunk', () => {
    const loggedInState = {
      user: mockUser,
      token: 'mock-token',
      isLoading: false,
      error: null
    };
    beforeEach(() => {
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'mock-token');
    });
    test('проверяем начало обновления пользователя', () => {
      const action = { type: updateUserThunk.pending.type };
      const newState = authReducer(loggedInState, action);

      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBeNull();
    });
    test('проверяем успешное обновление пользователя и запись в localStorage', () => {
      const updatedUserData = { ...mockUser, name: 'New Name' };
      const action = {
        type: updateUserThunk.fulfilled.type,
        payload: updatedUserData
      };
      const newState = authReducer(loggedInState, action);

      expect(newState.isLoading).toBe(false);
      expect(newState.user).toEqual(updatedUserData);
      expect(newState.error).toBeNull();

      expect(newState.token).toBe('mock-token');
      expect(localStorage.getItem('user')).toBe(
        JSON.stringify(updatedUserData)
      );
      expect(localStorage.getItem('token')).toBe('mock-token');
    });
    test('проверяем ошибку обновления пользователя', () => {
      const errorMessage = 'Ошибка обновления данных';
      const action = {
        type: updateUserThunk.rejected.type,
        payload: errorMessage
      };
      const newState = authReducer(loggedInState, action);

      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(errorMessage);
      expect(newState.user).toEqual(mockUser);
    });
  });
});
