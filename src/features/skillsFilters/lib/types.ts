export type Gender = 'm' | 'f';
export type Mode = 'all' | 'learn' | 'teach';

export type Filters = {
  mode: Mode;
  categories: Set<string>;
  cities: Set<string>;
  gender: Gender | null;
  q: string;
};
