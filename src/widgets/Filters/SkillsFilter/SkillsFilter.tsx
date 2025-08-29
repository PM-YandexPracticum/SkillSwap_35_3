import { useMemo, useState, useEffect } from 'react';
import { useAppDispatch, useSelector } from '@/app/store';

import { selectCategories } from '@/entities/Filters/model/filtersSelectors';
import {
  setCategories,
  toggleCategory,
  toggleSkill
} from '@/entities/Filters/model/filtersSlice';

import radioStyles from '@/widgets/Filters/RadioFilter/RadioFilter.module.css';
import styles from './SkillsFilter.module.css';
import { Checkbox } from '@/shared/ui/Checkbox';

type Skill = { id: string | number; title: string } & Record<string, unknown>;
type Props = { skills: Skill[] };

function getCategoryTitle(s: Skill): string {
  const r = s as Record<string, unknown>;
  const val =
    r['categoryTitle'] ??
    r['category'] ??
    r['categoryName'] ??
    r['group'] ??
    (r['parent'] as Record<string, unknown> | undefined)?.['title'] ??
    'Все навыки';
  return String(val ?? '');
}

function getCategoryId(s: Skill): string {
  const r = s as Record<string, unknown>;
  const id =
    r['categoryId'] ??
    r['category_id'] ??
    (r['parent'] as Record<string, unknown> | undefined)?.['id'] ??
    getCategoryTitle(s);
  return String(id ?? '');
}

export function SkillsFilter({ skills }: Props) {
  const dispatch = useAppDispatch();
  const selected = useSelector(selectCategories);

  // группируем навыки по категории
  const groups = useMemo(() => {
    const map = new Map<
      string,
      { key: string; title: string; subIds: string[]; subTitles: string[] }
    >();

    for (const raw of skills) {
      const rr = raw as Record<string, unknown>;
      const id = String(rr['id']);
      const title = String(rr['title'] ?? '');
      if (!id || !title) continue;

      const catId = getCategoryId(raw);
      const catTitle = getCategoryTitle(raw);

      if (!map.has(catId)) {
        map.set(catId, {
          key: catId,
          title: catTitle,
          subIds: [],
          subTitles: []
        });
      }
      const g = map.get(catId)!;
      g.subIds.push(id);
      g.subTitles.push(title);
    }

    // сортировка категорий по алфавиту
    return Array.from(map.values()).sort((a, b) =>
      a.title.localeCompare(b.title, 'ru')
    );
  }, [skills]);

  // открываем первую категорию, сохраняем состояние при обновлении списка
  const [open, setOpen] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const next: Record<string, boolean> = {};
    for (const g of groups) {
      next[g.key] = open[g.key] ?? groups[0]?.key === g.key;
    }
    setOpen(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups.length]);

  return (
    <fieldset className={radioStyles.radio__filter}>
      <div className={radioStyles['radio__filter-wrapper']}>
        <legend className={radioStyles['radio__filter-title']}>Навыки</legend>

        <div className={radioStyles['radio__filter-container']}>
          {groups.map((g) => {
            const allSelected =
              g.subIds.length > 0 &&
              g.subIds.every((id) => selected.includes(id));
            const partial =
              !allSelected && g.subIds.some((id) => selected.includes(id));
            const isOpen = !!open[g.key];

            return (
              <div className={styles['skills-filter__group']} key={g.key}>
                <div className={styles['skills-filter__cat-row']}>
                  {/* Кнопка слева: «индикатор» + название категории */}
                  <button
                    type='button'
                    className={styles['skills-filter__cat-left']}
                    role='checkbox'
                    aria-checked={partial ? 'mixed' : allSelected}
                    onClick={() =>
                      dispatch(toggleCategory({ subcategoryIds: g.subIds }))
                    }
                  >
                    <span
                      className={[
                        styles['skills-filter__indicator'],
                        allSelected
                          ? styles['skills-filter__indicator--on']
                          : '',
                        partial
                          ? styles['skills-filter__indicator--partial']
                          : ''
                      ].join(' ')}
                      aria-hidden='true'
                    />
                    <span className={styles['skills-filter__cat-title']}>
                      {g.title}
                    </span>
                  </button>

                  {/* Кнопка справа: раскрыть/свернуть подсписок */}
                  <button
                    type='button'
                    className={styles['skills-filter__chevron-btn']}
                    aria-label={isOpen ? 'Свернуть' : 'Развернуть'}
                    onClick={() =>
                      setOpen((s) => ({ ...s, [g.key]: !s[g.key] }))
                    }
                  >
                    <svg
                      className={[
                        styles['skills-filter__chevron'],
                        isOpen ? styles['skills-filter__chevron--open'] : ''
                      ].join(' ')}
                      width='16'
                      height='8'
                      viewBox='0 0 16 8'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      aria-hidden='true'
                      focusable='false'
                    >
                      <path
                        d='M15.3101 7.93308C15.1347 7.93308 14.9594 7.85924 14.8356 7.73545L8.00022 0.900072L1.16484 7.73545C0.917244 7.98305 0.516393 7.98305 0.268796 7.73545C0.0211994 7.48785 0.0211994 7.08699 0.268796 6.8394L7.55271 0.555476C7.8003 0.30788 8.20115 0.30788 8.44875 0.555476L15.7327 6.8394C15.9803 7.08699 15.9803 7.48785 15.7327 7.73545C15.6089 7.85924 15.4335 7.93308 15.2582 7.93308H15.3101Z'
                        fill='#253017'
                      />
                    </svg>
                  </button>
                </div>

                {isOpen && (
                  <div className={styles['skills-filter__sub-list']}>
                    <Checkbox
                      name={`skills-${g.key}`}
                      options={g.subIds.map((id, i) => ({
                        label: g.subTitles[i],
                        value: id
                      }))}
                      values={selected}
                      onChange={(value: string, nextChecked: boolean) => {
                        const id = String(value);
                        if (nextChecked) {
                          const next = Array.from(
                            new Set([...selected, id])
                          );
                          dispatch(setCategories(next));
                        } else {
                          dispatch(toggleSkill(id));
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </fieldset>
  );
}
