import type { Filters, Gender, Mode } from './types';

const getCity = (u: any): string | undefined => u.city ?? u.location;

const normalize = (s: unknown) =>
  (typeof s === 'string' ? s : String(s ?? '')).trim().toLowerCase();

const getCategoryFromValue = (v: any): string | undefined =>
  typeof v === 'string' ? v : (v?.title ?? v?.name ?? v?.subcategory);

const getTeach = (u: any): string[] => {
  const v = u.canTeach ?? u.skillCanTeach;
  const one = getCategoryFromValue(v);
  return one ? [one] : [];
};

const getLearn = (u: any): string[] => {
  const arr =
    u.wantToLearn ?? u.skillsWantToLearn ?? u.subcategoriesWantToLearn ?? [];
  return (Array.isArray(arr) ? arr : [])
    .map(getCategoryFromValue)
    .filter(Boolean) as string[];
};

const hasAny = (source: string[], needed: Set<string>) =>
  source.some((x) => needed.has(x));

const matchModeAndCategories = (u: any, mode: Mode, cats: Set<string>) => {
  if (cats.size === 0) return true;

  const teach = getTeach(u);
  const learn = getLearn(u);

  if (mode === 'teach') return hasAny(teach, cats);
  if (mode === 'learn') return hasAny(learn, cats);
  // mode === 'all'
  return hasAny(teach, cats) || hasAny(learn, cats);
};

const matchCity = (u: any, cities: Set<string>) => {
  if (cities.size === 0) return true;
  const city = getCity(u);
  return city ? cities.has(city) : false;
};

const matchGender = (u: any, gender: Gender | null) => {
  if (!gender) return true;
  return (u.gender ?? u.sex) === gender;
};

const matchQuery = (u: any, q: string) => {
  const needle = normalize(q);
  if (!needle) return true;

  const hay = [
    u.name,
    u.title,
    u.description,
    getTeach(u).join(' '),
    getLearn(u).join(' '),
  ]
    .filter(Boolean)
    .map(normalize)
    .join(' ');

  return hay.includes(needle);
};

function applyFilters(users: any[], filters: Filters) {
  const { mode, categories, cities, gender, q } = filters;

  return users.filter(
    (u) =>
      matchModeAndCategories(u, mode, categories) &&
      matchCity(u, cities) &&
      matchGender(u, gender) &&
      matchQuery(u, q),
  );
}

export default applyFilters;
export { applyFilters };
