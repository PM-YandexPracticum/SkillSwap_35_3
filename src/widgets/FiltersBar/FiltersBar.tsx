import { useEffect, useMemo, useState } from 'react';
import applyFilters from '@/features/skillsFilters/lib/applyFilters';
import type { Filters, Gender, Mode } from '@/features/skillsFilters/lib/types';
import type { IUser, ISkill } from '@/api/types';
import { RadioUI, CheckboxUI, Title } from '@/shared/ui';
import s from './FiltersBar.module.css';

type Props = {
  users: IUser[];
  skills: ISkill[];
  onChange?: (filtered: IUser[], filters: Filters) => void;
};

const initial: Filters = {
  mode: 'all',
  categories: new Set<string>(),
  cities: new Set<string>(),
  gender: null,
  q: '',
};

export function FiltersBar({ users, skills, onChange }: Props) {
  const [filters, setFilters] = useState<Filters>(initial);

  const cities = useMemo(
    () => Array.from(new Set(users.map((u) => u.city))).sort(),
    [users],
  );

  const skillOptions = useMemo(
    () => skills.map((s) => ({ id: String(s.id), title: s.title })),
    [skills],
  );

  const result = useMemo(
    () => applyFilters(users, filters, skills),
    [users, filters, skills],
  );

  useEffect(() => {
    onChange?.(result, filters);
  }, [result, filters, onChange]);

  const toggleSet = <T,>(source: Set<T>, value: T) => {
    const next = new Set(source);
    next.has(value) ? next.delete(value) : next.add(value);
    return next;
  };

  return (
    <section className={s.filters}>
      <Title as="h3" size="md">Фильтры</Title>

      <div className={s.filters__section}>
        <label className={s.search}>
          <span className={s.search__label}>Поиск</span>
          <input
            className={s.search__input}
            value={filters.q}
            onChange={(e) =>
              setFilters((f) => ({ ...f, q: e.target.value }))
            }
            placeholder="имя, навык…"
          />
        </label>
      </div>

      <div className={s.filters__section}>
        <Title as="h4" size="sm">Навыки</Title>
        <div className={s.filters__actions}>
          <button
            type="button"
            onClick={() =>
              setFilters((f) => ({ ...f, categories: new Set() }))
            }
          >
            Сбросить навыки
          </button>
        </div>
        <CheckboxUI
          name="skills"
          values={[...filters.categories]}
          options={skillOptions.map((c) => ({ label: c.title, value: c.id }))}
          onChange={(val /* string */, _checked) =>
            setFilters((f) => ({
              ...f,
              categories: toggleSet(f.categories, val),
            }))
          }
        />
      </div>

      <div className={s.filters__section}>
        <Title as="h4" size="sm">Режим</Title>
        <RadioUI
          name="mode"
          value={filters.mode as string}
          options={[
            { label: 'Все', value: 'all' },
            { label: 'Хочу научиться', value: 'learn' },
            { label: 'Могу научить', value: 'teach' },
          ]}
          onChange={(m) => setFilters((f) => ({ ...f, mode: m as Mode }))}
        />
      </div>

      <div className={s.filters__section}>
        <Title as="h4" size="sm">Пол</Title>
        <RadioUI
          name="gender"
          value={(filters.gender ?? 'any') as string}
          options={[
            { label: 'Любой', value: 'any' },
            { label: 'Мужской', value: 'male' },
            { label: 'Женский', value: 'female' },
          ]}
          onChange={(v) =>
            setFilters((f) => ({
              ...f,
              gender: v === 'any' ? null : (v as Gender),
            }))
          }
        />
      </div>

      <div className={s.filters__section}>
        <Title as="h4" size="sm">Города</Title>
        <div className={s.filters__actions}>
          <button
            type="button"
            onClick={() => setFilters((f) => ({ ...f, cities: new Set() }))}
          >
            Сбросить города
          </button>
        </div>
        <CheckboxUI
          name="cities"
          values={[...filters.cities]}
          options={cities.map((c) => ({ label: c, value: c }))}
          onChange={(val, _checked) =>
            setFilters((f) => ({
              ...f,
              cities: toggleSet(f.cities, val),
            }))
          }
        />
      </div>

      <div className={s.filters__actions}>
        <button type="button" onClick={() => setFilters(initial)}>
          Сбросить все
        </button>
        <span className={s.result}>
          Найдено: <b>{result.length}</b>
        </span>
      </div>
    </section>
  );
}
