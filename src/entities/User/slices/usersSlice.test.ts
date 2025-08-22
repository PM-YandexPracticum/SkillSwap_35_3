import { fetchUserByID, fetchUsers } from '../thunks/usersThunks';
import usersReducer, {
  clearSelected,
  initialState as usersInitialState
} from './usersSlice';
import { IUser } from '@/api/types';

const mockUsers: IUser[] = [
  {
    id: 1,
    name: 'Мария',
    gender: 'female',
    email: 'maria@example.com',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop',
    city: 'Москва',
    birthDate: '1995-10-28',
    teachingSkillId: 1,
    learningSkillIds: [2, 3, 5],
    about: 'Опытный специалист по Pomodoro, делюсь лайфхаками продуктивности.'
  },
  {
    id: 2,
    name: 'Иван',
    gender: 'male',
    email: 'ivan@example.com',
    avatar:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop',
    city: 'Санкт-Петербург',
    birthDate: '1992-05-15',
    teachingSkillId: 2,
    learningSkillIds: [1, 4, 10],
    about: 'Эксперт по матрице Эйзенхауэра, учу работать с приоритетами.'
  }
];

const mockUser: IUser = mockUsers[0];

describe('Проверка правильной настройки и работы usersReducer', () => {
  describe('Проверяем fetchUsers', () => {
    it('Pending стейт', () => {
      const state = usersReducer(
        usersInitialState,
        fetchUsers.pending('', undefined)
      );
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
    it('Fulfilled стейт', () => {
      const state = usersReducer(
        usersInitialState,
        fetchUsers.fulfilled(mockUsers, '', undefined)
      );
      expect(state.isLoading).toBe(false);
      expect(state.users).toEqual(mockUsers);
      expect(state.error).toBeNull();
    });
    it('Rejected стейт', () => {
      const state = usersReducer(
        usersInitialState,
        fetchUsers.rejected(new Error('Error') as Error, '', undefined)
      );
      expect(state.isLoading).toBe(false);
      expect(state.users).toEqual([]);
      expect(state.error).not.toBeNull();
    });
  });

  describe('Проверяем fetchUserByID', () => {
    it('Pending стейт', () => {
      const state = usersReducer(
        usersInitialState,
        fetchUserByID.pending('', 1)
      );
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
    it('Fulfilled стейт', () => {
      const state = usersReducer(
        usersInitialState,
        fetchUserByID.fulfilled(mockUser, '', 1)
      );
      expect(state.isLoading).toBe(false);
      expect(state.selected).toEqual(mockUser);
      expect(state.error).toBeNull();
    });
    it('Rejected стейт', () => {
      const state = usersReducer(
        usersInitialState,
        fetchUserByID.rejected(new Error('Error') as Error, '', 9999)
      );
      expect(state.isLoading).toBe(false);
      expect(state.selected).toBeNull();
      expect(state.error).not.toBeNull();
    });
  });

  describe('Проверяем clearSelected reducer', () => {
    it('Очищается до null', () => {
      const preload = { ...usersInitialState, selected: mockUser };
      const state = usersReducer(preload, clearSelected());
      expect(state.selected).toBeNull();
    });
  });
});
