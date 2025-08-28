import {
  selectIsCategorySelected,
  selectIsCategoryPartial
} from './filtersSelectors';
import type { RootState } from '@/app/store';

const makeState = (categories: string[]): RootState =>
  ({
    filters: {
      mode: 'all',
      gender: 'any',
      cities: [],
      categories,
      q: ''
    }
  }) as unknown as RootState;

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
