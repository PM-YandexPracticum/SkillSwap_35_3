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
