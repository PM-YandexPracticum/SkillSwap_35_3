import applyFilters from './applyFilters';
import type { Filters } from './types';

const initial = (): Filters => ({
  mode: 'all',
  categories: new Set(),
  cities: new Set(),
  gender: null,
  q: '',
});

const users = [
  {
    id: 1,
    name: 'Аня',
    city: 'Москва',
    gender: 'f',
    canTeach: 'english',
    wantToLearn: ['math'],
    description: 'учу английскому',
  },
  {
    id: 2,
    name: 'Борис',
    city: 'СПб',
    gender: 'm',
    canTeach: 'math',
    wantToLearn: ['english'],
    description: 'могу помочь с математикой',
  },
];

describe('applyFilters', () => {
  test('без фильтров возвращает исходный список', () => {
    const res = applyFilters(users, initial());
    expect(res.map((u) => u.id)).toEqual([1, 2]);
  });

  test('категория + режим teach', () => {
    const f = initial();
    f.categories = new Set(['english']);
    f.mode = 'teach';
    const res = applyFilters(users, f);
    expect(res.map((u) => u.id)).toEqual([1]);
  });

  test('категория + режим learn', () => {
    const f = initial();
    f.categories = new Set(['english']);
    f.mode = 'learn';
    const res = applyFilters(users, f);
    expect(res.map((u) => u.id)).toEqual([2]);
  });

  test('фильтр по полу', () => {
    const f = initial();
    f.gender = 'f';
    const res = applyFilters(users, f);
    expect(res.map((u) => u.id)).toEqual([1]);
  });

  test('фильтр по городу', () => {
    const f = initial();
    f.cities = new Set(['СПб']);
    const res = applyFilters(users, f);
    expect(res.map((u) => u.id)).toEqual([2]);
  });

  test('поиск по описанию', () => {
    const f = initial();
    f.q = 'математ';
    const res = applyFilters(users, f);
    expect(res.map((u) => u.id)).toEqual([2]);
  });
});
