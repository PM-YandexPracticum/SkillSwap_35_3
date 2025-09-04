import { useAppDispatch, useSelector } from '@/app/store';

import {
  selectMode,
  selectGender,
  selectCities,
  selectQuery,
  selectCategories
} from '@/entities/Filters/model/filtersSelectors';

import {
  setMode,
  setGender,
  setCities,
  resetFilters,
  type Mode,
  type Gender
} from '@/entities/Filters/model/filtersSlice';

import { CityFilter } from '@/widgets/Filters/CityFilter';
import { RadioFilter } from '@/widgets/Filters/RadioFilter';
import { SkillsFilter } from '@/widgets/Filters/SkillsFilter/SkillsFilter';

import styles from './FiltersPanel.module.css';
import mock from '@/api/mockData.json';
import type { ISkill, IUser } from '@/api/types';

interface MockShape {
  skills: ISkill[];
  users: IUser[];
}
const mockTyped: MockShape = mock as MockShape;
const skills = mockTyped.skills;
const citiesList = Array.from(new Set(mockTyped.users.map((u) => u.city))).sort(
  (a, b) => a.localeCompare(b, 'ru')
);

const modeOptions = [
  { label: 'Все', value: 'all' },
  { label: 'Хочу учить', value: 'learn' },
  { label: 'Могу учить', value: 'teach' }
];

const genderOptions = [
  { label: 'Не имеет значения', value: 'any' },
  { label: 'Мужчины', value: 'male' },
  { label: 'Женщины', value: 'female' }
];

export function FiltersPanel() {
  const dispatch = useAppDispatch();
  const mode = useSelector(selectMode);
  const gender = useSelector(selectGender);
  const cities = useSelector(selectCities);
  const q = useSelector(selectQuery);
  const categories = useSelector(selectCategories);

  const activeCount =
    (mode !== 'all' ? 1 : 0) +
    (gender !== 'any' ? 1 : 0) +
    (cities.length > 0 ? 1 : 0) +
    (categories.length > 0 ? 1 : 0) +
    (q.trim().length > 0 ? 1 : 0);

  const hasActiveFilters = activeCount > 0;

  return (
    <aside className={styles['filters-panel']}>
      <div className={styles['filters-panel__header']}>
        <h3 className={styles['filters-panel__title']}>
          Фильтры{hasActiveFilters && <span> ({activeCount})</span>}
        </h3>

        {hasActiveFilters && (
          <button
            type='button'
            className={styles['filters-panel__reset']}
            onClick={() => dispatch(resetFilters())}
            aria-label='Сбросить все фильтры'
          >
            <span>Сбросить</span>
            <span className={styles['filters-panel__resetIcon']} aria-hidden>
              ×
            </span>
          </button>
        )}
      </div>

      <RadioFilter
        name='mode'
        value={mode}
        radioList={modeOptions}
        onChange={(v) => dispatch(setMode((v as Mode) ?? 'all'))}
      />

      <SkillsFilter skills={skills} />

      <RadioFilter
        title='Пол автора'
        name='gender'
        value={gender}
        radioList={genderOptions}
        onChange={(v) => dispatch(setGender((v as Gender) ?? 'any'))}
      />

      <CityFilter
        value={cities}
        cities={citiesList}
        onChange={(arr: string[]) => dispatch(setCities(arr))}
      />
    </aside>
  );
}
