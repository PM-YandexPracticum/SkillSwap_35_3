import { createSelector } from '@reduxjs/toolkit';
import { selectUsers } from '@/entities/User/selectors/usersSelectors';
import { selectSkills } from '@/entities/Skill/selectors/skillsSelectors';
import { selectFilters } from '@/entities/Filters/model/filtersSelectors';
import applyFilters from '@/entities/Filters/lib/applyFilters';

export const selectFilteredUsers = createSelector(
  [selectUsers, selectFilters, selectSkills],
  (users, filters, skills) => applyFilters(users, filters, skills)
);
