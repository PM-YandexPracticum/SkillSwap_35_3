import mockData from './mockData.json';
import type { ISkill, IUser } from './types';

const { skills, users } = mockData as { skills: ISkill[]; users: IUser[] };

export const mockSkills: ISkill[] = skills;
export const mockUsers: IUser[] = users;

export const getSkills = (): Promise<ISkill[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(mockSkills), 400);
  });

export const getUsers = (): Promise<IUser[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(mockUsers), 400);
  });

export const getUserById = (id: number): Promise<IUser | null> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find((u) => u.id === id);
      resolve(user || null);
    }, 400);
  });

export const getSkillById = (id: number): Promise<ISkill | null> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const skill = mockSkills.find((s) => s.id === id);
      resolve(skill || null);
    }, 400);
  });
