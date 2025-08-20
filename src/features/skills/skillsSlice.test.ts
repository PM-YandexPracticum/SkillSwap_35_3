import { fetchSkillById, fetchSkills } from './skillsThunk';
import skillsReducer, {
  initialState as skillsInitialState
} from './skillsSlice';
import { ISkill } from '@/api/types';

const mockSkills: ISkill[] = [
  {
    id: 1,
    title: 'Техника Pomodoro',
    category: 'Бизнес и карьера',
    subcategory: 'Тайм-менеджмент',
    images: [
      'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800',
      'https://images.unsplash.com/photo-1707904112367-eab8c5f2912f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1681459876999-4f6cd1164e4c?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1634906344066-2c9dfd5e8ef7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1603119574997-c50fd39f8375?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ]
  },
  {
    id: 2,
    title: 'Матрица Эйзенхауэра',
    category: 'Бизнес и карьера',
    subcategory: 'Тайм-менеджмент',
    images: [
      'https://images.unsplash.com/photo-1572473773346-51c29ac7d978?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1617271345189-f968eaa2b292?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1739054730201-4b6463484e3c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1551200536-84057e779fac?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ]
  }
];

const mockSkill: ISkill = mockSkills[0];

describe('skillsSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Проверка правильной настройки и работы skillsReducer', () => {
    it('Должен вернуть skillsInitialState', () => {
      expect(skillsReducer(undefined, { type: 'unknown' })).toEqual(
        skillsInitialState
      );
    });
  });

  describe('extraReducers', () => {
    it('Проверяем fetchSkills.pending', () => {
      const action = { type: fetchSkills.pending.type };
      const state = skillsReducer(skillsInitialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Проверяем fetchSkills.fulfilled', () => {
      const action = { type: fetchSkills.fulfilled.type, payload: mockSkills };
      const state = skillsReducer(skillsInitialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.skills).toEqual(mockSkills);
      expect(state.error).toBeNull();
    });

    it('Проверяем fetchSkills.rejected', () => {
      const error = new Error('Failed to fetch skills');
      const action = {
        type: fetchSkills.rejected.type,
        error: { message: error.message }
      };
      const state = skillsReducer(skillsInitialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual({ message: error.message });
    });

    it('Проверяем fetchSkillByID.pending', () => {
      const action = { type: fetchSkillById.pending.type };
      const state = skillsReducer(skillsInitialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Проверяем fetchSkillByID.fulfilled', () => {
      const action = {
        type: fetchSkillById.fulfilled.type,
        payload: mockSkill
      };
      const state = skillsReducer(skillsInitialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.selected).toEqual(mockSkill);
      expect(state.error).toBeNull();
    });

    it('Проверяем fetchSkillByID.rejected', () => {
      const error = new Error('Failed to fetch skill');
      const action = {
        type: fetchSkillById.rejected.type,
        error: { message: error.message }
      };
      const state = skillsReducer(skillsInitialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual({ message: error.message });
    });
  });
});
