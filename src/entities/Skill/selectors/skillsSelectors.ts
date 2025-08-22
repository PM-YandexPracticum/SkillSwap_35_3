import { RootState } from '@/app/store';

export const selectSkills = (state: RootState) => state.skills.skills;
export const selectSelectedSkill = (state: RootState) => state.skills.selected;
export const selectSkillsLoading = (state: RootState) => state.skills.isLoading;
export const selectSkillsError = (state: RootState) => state.skills.error;
