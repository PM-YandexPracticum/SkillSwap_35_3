import type { IUser } from '@/api/types';

export type Gender = IUser['gender'];
export type Mode = 'all' | 'learn' | 'teach';

export type Filters = {
  mode: Mode;
  categories: Set<string>;
  cities: Set<string>;
  gender: Gender | null;
  q: string;
};
