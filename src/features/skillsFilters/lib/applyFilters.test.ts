import { applyFilters } from './applyFilters';
import type { Filters } from './types';
import type { IUser, ISkill } from '@/api/types';

const initial = (): Filters => ({
  mode: 'all',
  categories: new Set(),
  cities: new Set(),
  gender: null,
  q: '',
});

const makeSkill = (id: number | string, title: string): ISkill =>
  ({
    id,
    title,
    category: '',
    subcategory: '',
    images: [],
  } as ISkill);

const skills: ISkill[] = [
  makeSkill(1, 'english'),
  makeSkill(2, 'math'),
];

const users: IUser[] = [
  {
    id: 1 as any,
    name: 'Аня',
    city: 'Москва',
    gender: 'female',
    ...( { teachIds: [1], learnIds: [2] } as any ),
  },
  {
    id: 2 as any,
    name: 'Борис',
    city: 'СПб',
    gender: 'male',
    ...( { teachIds: [2], learnIds: [1] } as any ),
  },
];

describe('applyFilters (ids + skills map)', () => {
  test('без фильтров возвращает исходный список', () => {
    const res = applyFilters(users, initial(), skills);
    expect(res.map((u) => u.id)).toEqual([1, 2]);
  });

  test('категория (id) + режим teach', () => {
    const f = initial();
    f.categories = new Set(['1']); // ids как строки
    f.mode = 'teach';
    const res = applyFilters(users, f, skills);
    expect(res.map((u) => u.id)).toEqual([1]);
  });

  test('категория (id) + режим learn', () => {
    const f = initial();
    f.categories = new Set(['1']);
    f.mode = 'learn';
    const res = applyFilters(users, f, skills);
    expect(res.map((u) => u.id)).toEqual([2]);
  });

  test('фильтр по полу', () => {
    const f = initial();
    f.gender = 'female';
    const res = applyFilters(users, f, skills);
    expect(res.map((u) => u.id)).toEqual([1]);
  });

  test('фильтр по городу', () => {
    const f = initial();
    f.cities = new Set(['СПб']);
    const res = applyFilters(users, f, skills);
    expect(res.map((u) => u.id)).toEqual([2]);
  });

  test('поиск по названию навыка (через skills)', () => {
    const f = initial();
    f.q = 'engl';
    const res = applyFilters(users, f, skills);
    expect(res.map((u) => u.id)).toEqual([1]);
  });
});
