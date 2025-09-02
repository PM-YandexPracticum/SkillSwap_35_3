import { ISkill } from '@/api/types';
import { createSlice, SerializedError } from '@reduxjs/toolkit';
import {
  fetchSkills,
  fetchSkillById
} from '@/entities/Skill/thunks/skillsThunk';

type SkillState = {
  skills: ISkill[];
  selected: ISkill | null;
  isLoading: boolean;
  error: SerializedError | null;
};

export const initialState: SkillState = {
  skills: [],
  selected: null,
  isLoading: false,
  error: null
};

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setSelectedSkill: (state, action) => {
      state.selected = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.isLoading = false;
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(fetchSkillById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSkillById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selected = action.payload;
      })
      .addCase(fetchSkillById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export const { setSelectedSkill } = skillsSlice.actions;
export default skillsSlice.reducer;
