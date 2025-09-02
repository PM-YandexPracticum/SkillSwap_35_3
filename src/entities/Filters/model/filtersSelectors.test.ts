import {
  selectIsCategorySelected,
  selectIsCategoryPartial,
  selectActiveFilters
} from './filtersSelectors';
import type { RootState } from '@/app/store';
import type { ISkill } from '@/api/types';
import { initialState as usersInitialState } from '@/entities/User/slices/usersSlice';
import { initialState as skillsInitialState } from '@/entities/Skill/slices/skillsSlice';
import { initialState as authInitialState } from '@/features/auth/slices/authSlice';

const makeState = (categories: string[]): RootState => ({
  users: usersInitialState,
  skills: skillsInitialState,
  auth: authInitialState,
  filters: {
    mode: 'all',
    gender: 'any',
    cities: [],
    categories,
    q: ''
  }
});

describe('filters selectors for Skills', () => {
  test('selectIsCategorySelected: true when all subIds are chosen', () => {
    const state = makeState(['a', 'b', 'c']);
    const isSelected = selectIsCategorySelected(['a', 'b'])(state);
    expect(isSelected).toBe(true);
  });

  test('selectIsCategorySelected: false when some subIds are missing', () => {
    const state = makeState(['a']);
    const isSelected = selectIsCategorySelected(['a', 'b'])(state);
    expect(isSelected).toBe(false);
  });

  test('selectIsCategoryPartial: true when at least one but not all are chosen', () => {
    const state = makeState(['a']);
    const isPartial = selectIsCategoryPartial(['a', 'b'])(state);
    expect(isPartial).toBe(true);
  });

  test('selectIsCategoryPartial: false when none are chosen', () => {
    const state = makeState([]);
    const isPartial = selectIsCategoryPartial(['a', 'b'])(state);
    expect(isPartial).toBe(false);
  });

  test('selectIsCategoryPartial: false when all are chosen', () => {
    const state = makeState(['a', 'b']);
    const isPartial = selectIsCategoryPartial(['a', 'b'])(state);
    expect(isPartial).toBe(false);
  });
});

const makeStateForActive = (
  filters: Partial<RootState['filters']>,
  skills: ISkill[] = []
): RootState => ({
  users: usersInitialState,
  auth: authInitialState,
  filters: {
    mode: 'all',
    gender: 'any',
    cities: [],
    categories: [],
    q: '',
    ...filters
  },
  skills: {
    ...skillsInitialState,
    skills
  }
});

describe('selectActiveFilters', () => {
  test('returns active filters with readable labels', () => {
    const filters = {
      mode: 'teach',
      gender: 'male',
      cities: ['Москва'],
      categories: ['1'],
      q: 'js'
    } as RootState['filters'];
    const skills = [
      { id: 1, title: 'JS', category: '', subcategory: '', images: [] }
    ];
    const state = makeStateForActive(filters, skills);
    expect(selectActiveFilters(state)).toEqual([
      { type: 'mode', value: 'teach', label: 'Могу учить' },
      { type: 'gender', value: 'male', label: 'Мужчины' },
      { type: 'city', value: 'Москва', label: 'Москва' },
      { type: 'category', value: '1', label: 'JS' },
      { type: 'query', value: 'js', label: 'js' }
    ]);
  });
});
