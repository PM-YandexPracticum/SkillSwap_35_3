import { useEffect, useMemo, useState } from 'react';
import applyFilters from '@/features/skillsFilters/lib/applyFilters';
import type { Filters, Gender, Mode } from '@/features/skillsFilters/lib/types';
import { RadioUI, CheckboxUI, Title } from '@/shared/ui';
import s from './FiltersBar.module.css';

type Props = {
  users: any[];
  onChange?: (filtered: any[], filters: Filters) => void;
};

const initial: Filters = {
  mode: 'all',
  categories: new Set<string>(),
  cities: new Set<string>(),
  gender: null,
  q: '',
};

export function FiltersBar({ users, onChange }: Props) {
  const [filters, setFilters] = useState<Filters>(initial);

  const cities = useMemo(
    () =>
      Array.from(
        new Set(users.map((u: any) => u.city ?? u.location).filter(Boolean)),
      ).sort(),
    [users],
  );

  const categories = useMemo(() => {
    const teach = users
      .map((u: any) => u.canTeach ?? u.skillCanTeach)
      .map((v) =>
        typeof v === 'string' ? v : v?.title ?? v?.name ?? v?.subcategory,
      )
      .filter(Boolean) as string[];

    const learn = users.flatMap((u: any) =>
      (u.wantToLearn ??
        u.skillsWantToLearn ??
        u.subcategoriesWantToLearn ??
        []
      )
        .map((v: any) =>
          typeof v === 'string' ? v : v?.title ?? v?.name ?? v?.subcategory,
        )
        .filter(Boolean),
    ) as string[];

    return Array.from(new Set([...teach, ...learn])).sort();
  }, [users]);

  const result = useMemo(() => applyFilters(users, filters), [users, filters]);

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

      {/* Поиск */}
      <div className={s.filters__section}>
        <label className={s.search}>
          <span className={s.search__label}>Поиск</span>
          <input
            className={s.search__input}
            value={filters.q}
            onChange={(e) =>
              setFilters((f) => ({ ...f, q: e.target.value }))
            }
            placeholder="имя, описание…"
          />
        </label>
      </div>

      {/* Категории */}
      <div className={s.filters__section}>
        <Title as="h4" size="sm">Категории/подкатегории</Title>
        <div className={s.filters__actions}>
          <button
            type="button"
            onClick={() =>
              setFilters((f) => ({ ...f, categories: new Set() }))
            }
          >
            Сбросить категории
          </button>
        </div>
        <CheckboxUI
          name="categories"
          values={[...filters.categories]}
          options={categories.map((c) => ({ label: c, value: c }))}
          onChange={(val) =>
            setFilters((f) => ({
              ...f,
              categories: toggleSet(f.categories, val),
            }))
          }
        />
      </div>

      {/* Режим */}
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
          onChange={(m) =>
            setFilters((f) => ({ ...f, mode: m as Mode }))
          }
        />
      </div>

      {/* Пол */}
      <div className={s.filters__section}>
        <Title as="h4" size="sm">Пол</Title>
        <RadioUI
          name="gender"
          value={(filters.gender ?? 'any') as string}
          options={[
            { label: 'Любой', value: 'any' },
            { label: 'Мужской', value: 'm' },
            { label: 'Женский', value: 'f' },
          ]}
          onChange={(v) =>
            setFilters((f) => ({
              ...f,
              gender: v === 'any' ? null : (v as Gender),
            }))
          }
        />
      </div>

      {/* Города */}
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
          onChange={(val) =>
            setFilters((f) => ({
              ...f,
              cities: toggleSet(f.cities, val),
            }))
          }
        />
      </div>

      {/* Действия */}
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
