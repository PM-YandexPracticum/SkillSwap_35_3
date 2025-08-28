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
  for (const s of skills as any[]) {
    const id = normalize((s as any)?.id);
    const title = normalize((s as any)?.title);
    if (id) map.set(id, title);
  }
  return map;
};

// Поддерживаем разные схемы хранения навыков у пользователя
type WithSkillFields = {
  teachingSkillId?: unknown;
  learningSkillIds?: unknown[];
  teachIds?: unknown[];
  learnIds?: unknown[];
  teach?: unknown[];
  learn?: unknown[];
  skills?: { teach?: unknown[]; learn?: unknown[] };
};

const toId = (x: unknown): string => {
  if (x == null) return '';
  if (typeof x === 'number' || typeof x === 'string') return String(x);
  if (typeof x === 'object') {
    const o = x as any;
    if (o.id != null) return String(o.id);
    if (o.skillId != null) return String(o.skillId);
    if (o.subcategoryId != null) return String(o.subcategoryId);
    if (o.skill?.id != null) return String(o.skill.id);
    if (o.title != null) return String(o.title); // иногда хранят просто названием
  }
  return '';
};

const idsOf = (arr?: unknown[]) =>
  (arr ?? []).map(toId).filter(Boolean) as string[];

// teach: один id или массив — поддерживаем оба
const getTeachIds = (u: IUser & Partial<WithSkillFields>): string[] => {
  const single = (u as any).teachingSkillId;
  if (single !== undefined && single !== null)
    return [toId(single)].filter(Boolean);
  return idsOf(u.teachIds ?? u.teach ?? u.skills?.teach);
};

const getLearnIds = (u: IUser & Partial<WithSkillFields>): string[] => {
  const list = (u as any).learningSkillIds as unknown[] | undefined;
  if (Array.isArray(list)) return idsOf(list);
  return idsOf(u.learnIds ?? u.learn ?? u.skills?.learn);
};

// --- predicates ---
const matchCity = (u: IUser, cities: Set<string>) =>
  cities.size === 0 || cities.has(u.city);

const matchGender = (u: IUser, gender: Gender) =>
  gender === 'any' || u.gender === gender;

const matchModeAndCategories = (
  u: IUser & Partial<WithSkillFields>,
  mode: Mode,
  selected: Set<string>
) => {
  if (selected.size === 0) return true;
  const teach = getTeachIds(u);
  const learn = getLearnIds(u);

  const teachHit = teach.some((id) => selected.has(String(id)));
  const learnHit = learn.some((id) => selected.has(String(id)));

  if (mode === 'teach') return teachHit;
  if (mode === 'learn') return learnHit;
  return teachHit || learnHit;
};

const matchQuery = (
  u: IUser & Partial<WithSkillFields>,
  q: string,
  idToTitle: Map<string, string>
) => {
  const needle = toLower(normalize(q));
  if (!needle) return true;

  const parts: string[] = [];
  if ((u as any).name) parts.push(normalize((u as any).name));

  // добавляем человекочитаемые названия навыков пользователя
  const ids = new Set<string>(
    [...getTeachIds(u), ...getLearnIds(u)].map(String)
  );
  for (const id of ids) {
    const title = idToTitle.get(id);
    if (title) parts.push(title);
  }

  return parts.join(' ').toLowerCase().includes(needle);
};

// --- main ---
function applyFilters(users: IUser[], filters: FiltersState, skills: ISkill[]) {
  const { mode, categories, cities, gender, q } = filters;

  const idToTitle = buildIdToTitle(skills);
  const selected = new Set<string>(categories.map(String));
  const citiesSet = new Set<string>(cities.map(String));

  return users.filter(
    (u: any) =>
      matchModeAndCategories(u, mode, selected) &&
      matchCity(u, citiesSet) &&
      matchGender(u, gender) &&
      matchQuery(u, q, idToTitle)
  );
}

export default applyFilters;
export { applyFilters };
