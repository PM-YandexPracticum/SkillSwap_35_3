import { useAppDispatch, useSelector } from '@/app/store';

import {
  selectMode,
  selectGender,
  selectCities
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

import radioStyles from '@/widgets/Filters/RadioFilter/RadioFilter.module.css';
import styles from './FiltersPanel.module.css';
import mock from '@/api/mockData.json';

const demoCities = [
  'Москва',
  'Санкт-Петербург',
  'Новосибирск',
  'Екатеринбург',
  'Казань'
];

type MockShape = { skills: { id: number; title: string }[] };
const mockTyped = mock as unknown as MockShape;
const skills = mockTyped.skills;

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

  return (
    <aside className={styles['filters-panel']}>
      <div className={styles['filters-panel__header']}>
        <h3 className={radioStyles['radio-filter__title']}>Фильтры</h3>
        <button
          type='button'
          className={styles['filters-panel__reset']}
          onClick={() => dispatch(resetFilters())}
        >
          Сбросить
        </button>
      </div>

      {/* 1) Режим — без заголовка */}
      <RadioFilter
        name='mode'
        value={mode}
        radioList={modeOptions}
        onChange={(v) => dispatch(setMode((v as Mode) ?? 'all'))}
      />

      {/* 2) Навыки — собственный заголовок внутри компонента */}
      <SkillsFilter skills={skills} />

      {/* 3) Пол автора — с заголовком */}
      <RadioFilter
        title='Пол автора'
        name='gender'
        value={gender}
        radioList={genderOptions}
        onChange={(v) => dispatch(setGender((v as Gender) ?? 'any'))}
      />

      {/* 4) Город — свой заголовок внутри компонента */}
      <CityFilter
        value={cities}
        cities={demoCities}
        onChange={(arr: string[]) => dispatch(setCities(arr))}
      />

      {/* Поиск временно скрыт из панели: логика в сторе и applyFilters сохранена */}
    </aside>
  );
}
