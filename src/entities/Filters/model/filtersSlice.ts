import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Mode = 'all' | 'learn' | 'teach';
export type Gender = 'any' | 'male' | 'female';

export interface FiltersState {
  mode: Mode;
  gender: Gender;
  cities: string[];
  categories: string[]; // id подкатегорий (skills)
  q: string;
}

const initialState: FiltersState = {
  mode: 'all',
  gender: 'any',
  cities: [],
  categories: [],
  q: ''
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<Mode>) {
      state.mode = action.payload;
    },
    setGender(state, action: PayloadAction<Gender>) {
      state.gender = action.payload;
    },
    setCities(state, action: PayloadAction<string[]>) {
      state.cities = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.q = action.payload;
    },
    setCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
    },
    toggleSkill(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.categories = state.categories.includes(id)
        ? state.categories.filter((cid) => cid !== id)
        : [...state.categories, id];
    },
    toggleCategory(state, action: PayloadAction<{ subcategoryIds: string[] }>) {
      const { subcategoryIds } = action.payload;
      const allSelected = subcategoryIds.every((id) =>
        state.categories.includes(id)
      );
      state.categories = allSelected
        ? state.categories.filter((cid) => !subcategoryIds.includes(cid))
        : Array.from(new Set([...state.categories, ...subcategoryIds]));
    },
    resetFilters() {
      return initialState;
    }
  }
});

export const {
  setMode,
  setGender,
  setCities,
  setQuery,
  setCategories,
  toggleSkill,
  toggleCategory,
  resetFilters
} = filtersSlice.actions;

export default filtersSlice.reducer;
