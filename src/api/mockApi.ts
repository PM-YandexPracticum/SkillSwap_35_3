import mockData from './mockData.json';
import type { ISkill, IUser } from './types';

const { skills, users } = mockData as { skills: ISkill[]; users: IUser[] };

// Создайте изменяемые копии массивов
export const mockSkills: ISkill[] = [...skills];
export const mockUsers: IUser[] = [...users]; // ← используйте let и spread оператор

export const getSkills = (): Promise<ISkill[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve([...mockSkills]), 400);
  });

export const getUsers = (): Promise<IUser[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve([...mockUsers]), 400);
  });

export const getUserById = (id: number): Promise<IUser | null> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find((u) => u.id === id);
      resolve(user ? { ...user } : null);
    }, 400);
  });

export const getSkillById = (id: number): Promise<ISkill | null> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const skill = mockSkills.find((s) => s.id === id);
      resolve(skill ? { ...skill } : null);
    }, 400);
  });

export const registerUser = (newUser: Omit<IUser, 'id'>): Promise<IUser> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = mockUsers.some((u) => u.email === newUser.email);
      if (exists) {
        reject(new Error('Email уже используется'));
        return;
      }
      const id =
        mockUsers.length > 0 ? Math.max(...mockUsers.map((u) => u.id)) + 1 : 1;
      const user: IUser = { ...newUser, id };
      mockUsers.push(user);

      resolve({ ...user });
    }, 400);
  });

export const loginUser = (email: string, password: string): Promise<IUser> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) {
        reject(new Error('Неверный email или пароль'));
        return;
      }
      resolve({ ...user });
    }, 400);
  });

export const updateUser = (
  id: number,
  updatedData: Partial<Omit<IUser, 'id'>>
): Promise<IUser | null> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = mockUsers.findIndex((u) => u.id === id);
      if (userIndex === -1) {
        resolve(null);
        return;
      }

      if (updatedData.email) {
        const emailExists = mockUsers.some(
          (u, index) => u.email === updatedData.email && index !== userIndex
        );
        if (emailExists) {
          reject(new Error('Email уже используется другим пользователем'));
          return;
        }
      }

      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...updatedData
      };

      resolve({ ...mockUsers[userIndex] });
    }, 400);
  });
