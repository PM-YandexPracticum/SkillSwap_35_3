import { useMemo, useState } from 'react';
import { useAppDispatch, useSelector } from '@/app/store';

import { selectCategories } from '@/entities/Filters/model/filtersSelectors';
import { toggleCategory } from '@/entities/Filters/model/filtersSlice';

import radioStyles from '@/widgets/Filters/RadioFilter/RadioFilter.module.css';
import styles from './SkillsFilter.module.css';
import { Checkbox, Icon } from '@/shared/ui';

interface Skill {
  id: string | number;
  title: string;
  subcategory?: string;
  categoryTitle?: string;
  category?: string;
  categoryName?: string;
  group?: string;
  categoryId?: string | number;
  category_id?: string | number;
  parent?: {
    id?: string | number;
    title?: string;
  };
}
type Props = { skills: Skill[] };

function getCategoryTitle(s: Skill): string {
  return (
    s.categoryTitle ??
    s.category ??
    s.categoryName ??
    s.group ??
    s.parent?.title ??
    'Все навыки'
  );
}

function getCategoryId(s: Skill): string {
  return String(
    s.categoryId ?? s.category_id ?? s.parent?.id ?? getCategoryTitle(s)
  );
}

export function SkillsFilter({ skills }: Props) {
  const dispatch = useAppDispatch();
  const selected = useSelector(selectCategories);

  // группируем навыки по категории
  const groups = useMemo(() => {
    const map = new Map<
      string,
      {
        key: string;
        title: string;
        subs: Map<string, { title: string; ids: string[] }>;
      }
    >();

    for (const raw of skills) {
      const id = String(raw.id);
      const subTitle = String(raw.subcategory ?? '');
      if (!id || !subTitle) continue;

      const catId = getCategoryId(raw);
      const catTitle = getCategoryTitle(raw);

      if (!map.has(catId)) {
        map.set(catId, { key: catId, title: catTitle, subs: new Map() });
      }
      const g = map.get(catId)!;
      if (!g.subs.has(subTitle)) {
        g.subs.set(subTitle, { title: subTitle, ids: [] });
      }
      g.subs.get(subTitle)!.ids.push(id);
    }

    return Array.from(map.values())
      .map((g) => ({
        key: g.key,
        title: g.title,
        subs: Array.from(g.subs.values()).sort((a, b) =>
          a.title.localeCompare(b.title, 'ru')
        )
      }))
      .sort((a, b) => a.title.localeCompare(b.title, 'ru'));
  }, [skills]);

  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <fieldset className={radioStyles.radio__filter}>
      <div className={radioStyles['radio__filter-wrapper']}>
        <legend className={radioStyles['radio__filter-title']}>Навыки</legend>

        <div className={radioStyles['radio__filter-container']}>
          {groups.map((g) => {
            const catIds = g.subs.flatMap((s) => s.ids);
            const allSelected =
              catIds.length > 0 && catIds.every((id) => selected.includes(id));
            const partial =
              !allSelected && catIds.some((id) => selected.includes(id));
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
                      dispatch(
                        toggleCategory({
                          subcategoryIds: catIds
                        })
                      )
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
                    <Icon
                      name='arrow-down-icon'
                      className={[
                        styles['skills-filter__chevron'],
                        isOpen ? styles['skills-filter__chevron--open'] : ''
                      ].join(' ')}
                      aria-hidden='true'
                    />
                    {/* <svg
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
                    </svg> */}
                  </button>
                </div>

                {isOpen && (
                  <div className={styles['skills-filter__sub-list']}>
                    <Checkbox
                      name={`skills-${g.key}`}
                      options={g.subs.map((s) => ({
                        label: s.title,
                        value: s.title
                      }))}
                      values={g.subs
                        .filter((s) =>
                          s.ids.every((id) => selected.includes(id))
                        )
                        .map((s) => s.title)}
                      onChange={(value: string) => {
                        const sub = g.subs.find((s) => s.title === value);
                        if (sub) {
                          dispatch(toggleCategory({ subcategoryIds: sub.ids }));
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
