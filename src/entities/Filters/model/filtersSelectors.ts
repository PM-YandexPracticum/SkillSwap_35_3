import { type RootState } from '@/app/store';

export const selectFilters    = (s: RootState) => s.filters;

export const selectMode       = (s: RootState) => s.filters.mode;
export const selectGender     = (s: RootState) => s.filters.gender;
export const selectCities     = (s: RootState) => s.filters.cities;
export const selectCategories = (s: RootState) => s.filters.categories;
export const selectQuery      = (s: RootState) => s.filters.q;
