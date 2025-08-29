import type {
  FiltersState,
  Gender,
  Mode
} from '@/entities/Filters/model/filtersSlice';
import type { IUser, ISkill } from '@/api/types';

// --- utils ---
const normalize = (v: unknown) =>
  (typeof v === 'string' ? v : String(v ?? '')).trim();

const toLower = (s: string) => s.toLowerCase();

// Карта id -> title
const buildIdToTitle = (skills: ISkill[]) => {
  const map = new Map<string, string>();
  for (const s of skills) {
    const id = String(s.id);
    if (id) map.set(id, s.title ?? '');
  }
  return map;
};

const getTeachIds = (u: IUser): string[] =>
  u.teachingSkillId == null ? [] : [String(u.teachingSkillId)];

const getLearnIds = (u: IUser): string[] =>
  Array.isArray(u.learningSkillIds)
    ? u.learningSkillIds.map((x) => String(x))
    : [];

// фильтры
const matchCity = (u: IUser, cities: Set<string>) =>
  cities.size === 0 || cities.has(String(u.city));

const matchGender = (u: IUser, gender: Gender) =>
  gender === 'any' || u.gender === gender;

const matchModeAndCategories = (
  u: IUser,
  mode: Mode,
  selected: Set<string>
) => {
  if (selected.size === 0) return true;

  const teach = getTeachIds(u);
  const learn = getLearnIds(u);

  if (mode === 'teach') return teach.some((id) => selected.has(id));
  if (mode === 'learn') return learn.some((id) => selected.has(id));

  // mode === 'all'
  return (
    teach.some((id) => selected.has(id)) ||
    learn.some((id) => selected.has(id))
  );
};

const matchQuery = (u: IUser, q: string, idToTitle: Map<string, string>) => {
  const needle = toLower(normalize(q));
  if (!needle) return true;

  const titles: string[] = [];
  const ids = new Set<string>([...getTeachIds(u), ...getLearnIds(u)]);
  for (const id of ids) {
    const title = idToTitle.get(id);
    if (title) titles.push(title);
  }

  const haystack = [u.name, u.city, ...titles]
    .filter(Boolean)
    .map((s) => toLower(String(s)))
    .join(' ');

  return haystack.includes(needle);
};

// --- main ---
export function applyFilters(
  users: IUser[],
  filters: FiltersState,
  skills: ISkill[]
): IUser[] {
  const { mode, categories, cities, gender, q } = filters;

  const idToTitle = buildIdToTitle(skills);
  const selected = new Set<string>(categories.map(String));
  const citiesSet = new Set<string>(cities.map(String));

  return users.filter((u) => {
    return (
      matchModeAndCategories(u, mode, selected) &&
      matchCity(u, citiesSet) &&
      matchGender(u, gender) &&
      matchQuery(u, q, idToTitle)
    );
  });
}

export default applyFilters;
