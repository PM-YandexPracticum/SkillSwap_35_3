import { useDispatch, useSelector } from '@/app/store';

import { selectMode, selectGender, selectCities } from '@/entities/Filters/model/filtersSelectors';
import { setMode, setGender, setCities, type Mode, type Gender } from '@/entities/Filters/model/filtersSlice';

import { CityFilter } from '@/widgets/Filters/CityFilter';
import { RadioFilter } from '@/widgets/Filters/RadioFilter';

const demoCities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород'];

// Опции для радиофильтров
const modeOptions: { value: Mode; label: string }[] = [
  { value: 'all',   label: 'Всё' },
  { value: 'learn', label: 'Хочу научиться' },
  { value: 'teach', label: 'Могу научить' }
];

const genderOptions: { value: Gender; label: string }[] = [
  { value: 'any',   label: 'Не имеет значения' },
  { value: 'male',  label: 'Мужской' },
  { value: 'female',label: 'Женский' }
];

export function FiltersPanel() {
  const dispatch = useDispatch();

  const mode   = useSelector(selectMode);
  const gender = useSelector(selectGender);
  const cities = useSelector(selectCities) as string[];

  return (
    <aside style={{ padding: 16, maxWidth: 360 }}>
      {/* Режим */}
      <RadioFilter
        title="Режим"
        name="mode"
        value={mode}
        radioList={modeOptions}
        onChange={(v: string | null) => dispatch(setMode((v as Mode) ?? 'all'))}
      />

      {/* Пол */}
      <RadioFilter
        title="Пол автора"
        name="gender"
        value={gender}
        radioList={genderOptions}
        onChange={(v: string | null) => dispatch(setGender((v as Gender) ?? 'any'))}
      />

      {/* Города */}
      <CityFilter
        value={cities}
        cities={demoCities}
        onChange={(arr: string[]) => dispatch(setCities(arr))}
      />
    </aside>
  );
}
