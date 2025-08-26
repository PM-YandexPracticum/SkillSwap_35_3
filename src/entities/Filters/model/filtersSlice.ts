import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Mode = 'all' | 'learn' | 'teach';
export type Gender = 'any' | 'male' | 'female';

export interface FiltersState {
  mode: Mode;           // режим поиска
  gender: Gender;       // пол пользователя
  cities: string[];     // выбранные города
  categories: string[]; // выбранные категории/подкатегории навыков
  q: string;            // строка поиска
}

const initialState: FiltersState = {
  mode: 'all',
  gender: 'any',
  cities: [],
  categories: [],
  q: ''
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload;
    },
    setGender: (state, action: PayloadAction<Gender>) => {
      state.gender = action.payload;
    },
    setCities: (state, action: PayloadAction<string[]>) => {
      state.cities = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.q = action.payload;
    },
    reset: () => initialState
  }
});

export const {
  setMode,
  setGender,
  setCities,
  setCategories,
  setQuery,
  reset
} = filtersSlice.actions;

export default filtersSlice.reducer;
