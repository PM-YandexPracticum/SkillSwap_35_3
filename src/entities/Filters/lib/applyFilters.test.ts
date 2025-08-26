import { applyFilters } from '../lib/applyFilters';
import type { FiltersState } from '../model/filtersSlice';

const mockSkills = [
  { id: 's1', title: 'JS' },
  { id: 's2', title: 'React' },
];

const mockUsers = [
  {
    id: 1,
    name: 'Иван',
    city: 'Москва',
    gender: 'male',
    teach: ['s1'],
    learn: ['s2'],
  },
  {
    id: 2,
    name: 'Мария',
    city: 'Казань',
    gender: 'female',
    teach: ['s2'],
    learn: [],
  },
];

const baseFilters: FiltersState = {
  mode: 'all',
  gender: 'any',
  cities: [],
  categories: [],
  q: '',
};

describe('applyFilters', () => {
  it('returns all users if filters empty', () => {
    const res = applyFilters(mockUsers as any, baseFilters, mockSkills as any);
    expect(res.length).toBe(2);
  });

  it('filters by gender', () => {
    const f: FiltersState = { ...baseFilters, gender: 'female' };
    const res = applyFilters(mockUsers as any, f, mockSkills as any);
    expect(res).toHaveLength(1);
    expect(res[0].name).toBe('Мария');
  });

  it('filters by city', () => {
    const f: FiltersState = { ...baseFilters, cities: ['Москва'] };
    const res = applyFilters(mockUsers as any, f, mockSkills as any);
    expect(res).toHaveLength(1);
    expect(res[0].city).toBe('Москва');
  });

  it('filters by mode=teach + categories', () => {
    const f: FiltersState = { ...baseFilters, mode: 'teach', categories: ['s2'] };
    const res = applyFilters(mockUsers as any, f, mockSkills as any);
    expect(res).toHaveLength(1);
    expect(res[0].name).toBe('Мария');
  });

  it('filters by query', () => {
    const f: FiltersState = { ...baseFilters, q: 'rea' };
    const res = applyFilters(mockUsers as any, f, mockSkills as any);
    expect(res.some((u) => u.name === 'Иван' || u.name === 'Мария')).toBe(true);
  });
});
