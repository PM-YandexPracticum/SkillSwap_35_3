import { getSkillById, getSkills } from '@/api/mockApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSkills = createAsyncThunk(
  'skills/fetchAll',
  async (_, thunkAPI) => {
    try {
      const data = await getSkills();
      return data;
    } catch (err) {
      const error = err as Error;
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchSkillById = createAsyncThunk(
  'skills/fetchByID',
  async (id: number, thunkAPI) => {
    try {
      const skill = await getSkillById(id);
      return skill;
    } catch (err) {
      const error = err as Error;
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
