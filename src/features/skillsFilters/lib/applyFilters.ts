import type { Filters, Gender, Mode } from './types';
import type { IUser, ISkill } from '@/api/types';

const buildSkillTitleMap = (skills: ISkill[]) =>
  new Map<string, string>(skills.map((s) => [String(s.id), s.title]));

type WithSkillIds =
  | { teachIds?: (string | number)[]; learnIds?: (string | number)[] }
  | { teach?: (string | number)[]; learn?: (string | number)[] };

const idsOf = (list?: (string | number)[]) => (list ?? []).map(String);

const getTeachIds = (u: IUser): string[] => {
  const x = u as unknown as WithSkillIds;
  return idsOf((x as any).teachIds ?? (x as any).teach);
};
const getLearnIds = (u: IUser): string[] => {
  const x = u as unknown as WithSkillIds;
  return idsOf((x as any).learnIds ?? (x as any).learn);
};

const hasAny = (ids: string[], selected: Set<string>) =>
  ids.some((id) => selected.has(id));

const matchModeAndCategories = (
  u: IUser,
  mode: Mode,
  categories: Set<string>,
) => {
  if (categories.size === 0) return true;
  const teach = getTeachIds(u);
  const learn = getLearnIds(u);

  if (mode === 'teach') return hasAny(teach, categories);
  if (mode === 'learn') return hasAny(learn, categories);
  return hasAny(teach, categories) || hasAny(learn, categories);
};

const matchCity = (u: IUser, cities: Set<string>) =>
  cities.size === 0 ? true : cities.has(u.city);

const matchGender = (u: IUser, gender: Gender | null) =>
  gender ? u.gender === gender : true;

const normalize = (s: unknown) =>
  (typeof s === 'string' ? s : String(s ?? '')).trim().toLowerCase();

const matchQuery = (u: IUser, q: string, skills: ISkill[]) => {
  const needle = normalize(q);
  if (!needle) return true;

  const titleById = buildSkillTitleMap(skills);
  const teachTitles = getTeachIds(u).map((id) => titleById.get(id) ?? id);
  const learnTitles = getLearnIds(u).map((id) => titleById.get(id) ?? id);

  const hay = [u.name, ...teachTitles, ...learnTitles]
    .filter(Boolean)
    .map(normalize)
    .join(' ');

  return hay.includes(needle);
};

function applyFilters(users: IUser[], filters: Filters, skills: ISkill[]) {
  const { mode, categories, cities, gender, q } = filters;

  return users.filter(
    (u) =>
      matchModeAndCategories(u, mode, categories) &&
      matchCity(u, cities) &&
      matchGender(u, gender) &&
      matchQuery(u, q, skills),
  );
}

export default applyFilters;
export { applyFilters };
