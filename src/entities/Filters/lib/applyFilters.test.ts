import { applyFilters } from '../lib/applyFilters';
import type { FiltersState } from '../model/filtersSlice';
import type { IUser, ISkill } from '@/api/types';

const mockSkills: ISkill[] = [
  { id: 1, title: 'JS', category: '', subcategory: '', images: [] },
  { id: 2, title: 'React', category: '', subcategory: '', images: [] }
];

const mockUsers: IUser[] = [
  {
    id: 1,
    name: 'Иван',
    gender: 'male',
    email: 'a@a.a',
    password: 'x',
    avatar: '',
    city: 'Москва',
    birthDate: '1990-01-01',
    teachingSkillId: 1,
    learningSkillIds: [2],
    about: ''
  },
  {
    id: 2,
    name: 'Мария',
    gender: 'female',
    email: 'b@b.b',
    password: 'x',
    avatar: '',
    city: 'Казань',
    birthDate: '1992-01-01',
    teachingSkillId: 2,
    learningSkillIds: [],
    about: ''
  }
];

const baseFilters: FiltersState = {
  mode: 'all',
  gender: 'any',
  cities: [],
  categories: [],
  q: ''
};

describe('applyFilters', () => {
  it('returns all users if filters empty', () => {
    const res = applyFilters(mockUsers, baseFilters, mockSkills);
    expect(res.length).toBe(2);
  });

  it('filters by gender', () => {
    const f: FiltersState = { ...baseFilters, gender: 'female' };
    const res = applyFilters(mockUsers, f, mockSkills);
    expect(res).toHaveLength(1);
    expect(res[0].name).toBe('Мария');
  });

  it('filters by city', () => {
    const f: FiltersState = { ...baseFilters, cities: ['Москва'] };
    const res = applyFilters(mockUsers, f, mockSkills);
    expect(res).toHaveLength(1);
    expect(res[0].city).toBe('Москва');
  });

  it('filters by mode=teach + categories', () => {
    const f: FiltersState = {
      ...baseFilters,
      mode: 'teach',
      categories: ['2']
    };
    const res = applyFilters(mockUsers, f, mockSkills);
    expect(res).toHaveLength(1);
    expect(res[0].name).toBe('Мария');
  });

  it('filters by query', () => {
    const f: FiltersState = { ...baseFilters, q: 'rea' };
    const res = applyFilters(mockUsers, f, mockSkills);
    expect(res.some((u) => u.name === 'Иван' || u.name === 'Мария')).toBe(true);
  });
});
