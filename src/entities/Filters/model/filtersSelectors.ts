import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

export const selectFilters = (state: RootState) => state.filters;

export const selectMode = (s: RootState) => s.filters.mode;
export const selectGender = (s: RootState) => s.filters.gender;
export const selectCities = (s: RootState) => s.filters.cities;
export const selectCategories = (s: RootState) => s.filters.categories;
export const selectQuery = (s: RootState) => s.filters.q;

export const selectIsCategorySelected = (subcategoryIds: string[]) =>
  createSelector(
    selectCategories,
    (selected) =>
      subcategoryIds.length > 0 &&
      subcategoryIds.every((id) => selected.includes(id))
  );

export const selectIsCategoryPartial = (subcategoryIds: string[]) =>
  createSelector(selectCategories, (selected) => {
    if (subcategoryIds.length === 0) return false;
    const cnt = subcategoryIds.filter((id) => selected.includes(id)).length;
    return cnt > 0 && cnt < subcategoryIds.length;
  });

  export interface ActiveFilter {
  type: 'mode' | 'gender' | 'city' | 'category' | 'query';
  value: string;
  label: string;
}

export const selectActiveFilters = createSelector(
  [selectFilters, (state: RootState) => state.skills.skills],
  (filters, skills): ActiveFilter[] => {
    const result: ActiveFilter[] = [];
    const { mode, gender, cities, categories } = filters;

    if (mode !== 'all') {
      const label = mode === 'learn' ? 'Хочу учиться' : 'Могу учить';
      result.push({ type: 'mode', value: mode, label });
    }

    if (gender !== 'any') {
      const label = gender === 'male' ? 'Мужчины' : 'Женщины';
      result.push({ type: 'gender', value: gender, label });
    }

    for (const city of cities) {
      result.push({ type: 'city', value: city, label: city });
    }

    if (categories.length > 0) {
      const idToTitle = new Map(
        skills.map((s) => [String(s.id), s.title ?? ''])
      );
      for (const id of categories) {
        const label = idToTitle.get(String(id)) ?? '';
        result.push({ type: 'category', value: id, label });
      }
    }

    if (filters.q.trim()) {
      result.push({ type: 'query', value: filters.q, label: filters.q });
    }

    return result;
  }
);