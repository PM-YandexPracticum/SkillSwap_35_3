import { useAppDispatch, useSelector } from '@/app/store';

import {
  selectMode,
  selectGender,
  selectCities,
  selectQuery,
  selectCategories,
} from '@/entities/Filters/model/filtersSelectors';

import {
  setMode,
  setGender,
  setCities,
  setQuery,
  resetFilters,
  type Mode,
  type Gender,
} from '@/entities/Filters/model/filtersSlice';

import { CityFilter } from '@/widgets/Filters/CityFilter';
import { RadioFilter } from '@/widgets/Filters/RadioFilter';
import { SkillsFilter } from '@/widgets/Filters/SkillsFilter/SkillsFilter';

import radioStyles from '@/widgets/Filters/RadioFilter/RadioFilter.module.css';
import styles from './FiltersPanel.module.css';
import mock from '@/api/mockData.json';

const demoCities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород'];

type TSkill = (typeof mock)['skills'][number];

const modeOptions: { value: Mode; label: string }[] = [
  { value: 'all', label: 'Всё' },
  { value: 'learn', label: 'Хочу научиться' },
  { value: 'teach', label: 'Могу научить' },
];

const genderOptions: { value: Gender; label: string }[] = [
  { value: 'any', label: 'Не имеет значения' },
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
];

export function FiltersPanel() {
  const dispatch = useAppDispatch();

  const mode = useSelector(selectMode);
  const gender = useSelector(selectGender);
  const cities = useSelector(selectCities) as string[];
  const q = useSelector(selectQuery);
  const categories = useSelector(selectCategories);

  const skills: TSkill[] = (mock.skills as unknown as TSkill[]) ?? [];

  const filtersCount =
    (mode !== 'all' ? 1 : 0) +
    (gender !== 'any' ? 1 : 0) +
    (cities.length ? 1 : 0) +
    (q.trim() ? 1 : 0) +
    (categories.length ? 1 : 0);

  return (
    <aside className={styles['filters-panel']}>
      <div className={styles['filters-panel__header']}>
        <h3 className={styles['filters-panel__title']}>Фильтры ({filtersCount})</h3>
        <button
          className={styles['filters-panel__reset']}
          type="button"
          onClick={() => dispatch(resetFilters())}
        >
          Сбросить
        </button>
      </div>

      <fieldset className={radioStyles.radio__filter}>
        <div className={radioStyles['radio__filter-wrapper']}>
          <legend className={radioStyles['radio__filter-title']}>Поиск</legend>
          <div className={radioStyles['radio__filter-container']}>
            <input
              type="text"
              placeholder="Искать навык или автора…"
              value={q}
              onChange={(e) => dispatch(setQuery(e.target.value))}
              style={{ width: '100%', padding: '8px 12px' }}
            />
          </div>
        </div>
      </fieldset>

      <RadioFilter
        title="Режим"
        name="mode"
        value={mode}
        radioList={modeOptions}
        onChange={(v: string | null) => dispatch(setMode((v as Mode) ?? 'all'))}
      />

      <SkillsFilter skills={skills as any} />

      <RadioFilter
        title="Пол автора"
        name="gender"
        value={gender}
        radioList={genderOptions}
        onChange={(v: string | null) => dispatch(setGender((v as Gender) ?? 'any'))}
      />

      <CityFilter value={cities} cities={demoCities} onChange={(arr: string[]) => dispatch(setCities(arr))} />
    </aside>
  );
}
