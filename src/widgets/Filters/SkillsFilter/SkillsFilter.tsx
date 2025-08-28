import { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from '@/app/store';

import { selectCategories } from '@/entities/Filters/model/filtersSelectors';
import { setCategories, toggleCategory, toggleSkill } from '@/entities/Filters/model/filtersSlice';

import radioStyles from '@/widgets/Filters/RadioFilter/RadioFilter.module.css';
import styles from './SkillsFilter.module.css';
import { Checkbox } from '@/shared/ui/Checkbox';

type Skill = { id: string | number; title: string } & Record<string, unknown>;
type Props = { skills: Skill[] };

function getCategoryTitle(s: any): string {
  return String(
    s?.categoryTitle ??
      s?.category ??
      s?.categoryName ??
      s?.group ??
      s?.parent?.title ??
      'Все навыки',
  );
}
function getCategoryId(s: any): string {
  const id = s?.categoryId ?? s?.category_id ?? s?.parent?.id ?? getCategoryTitle(s);
  return String(id);
}

export function SkillsFilter({ skills }: Props) {
  const dispatch = useDispatch();
  const selected = useSelector(selectCategories);

  const groups = useMemo(() => {
    const map = new Map<string, { key: string; title: string; subIds: string[]; subTitles: string[] }>();
    for (const raw of skills as any[]) {
      const id = String(raw?.id);
      const title = String(raw?.title ?? '');
      if (!id || !title) continue;
      const catId = getCategoryId(raw);
      const catTitle = getCategoryTitle(raw);
      if (!map.has(catId)) map.set(catId, { key: catId, title: catTitle, subIds: [], subTitles: [] });
      const g = map.get(catId)!;
      g.subIds.push(id);
      g.subTitles.push(title);
    }
    return Array.from(map.values()).sort((a, b) => a.title.localeCompare(b.title, 'ru'));
  }, [skills]);

  const [open, setOpen] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const next: Record<string, boolean> = {};
    for (const g of groups) next[g.key] = open[g.key] ?? (groups[0]?.key === g.key);
    setOpen(next);
  }, [groups.length]);

  return (
    <fieldset className={radioStyles.radio__filter}>
      <div className={radioStyles['radio__filter-wrapper']}>
        <legend className={radioStyles['radio__filter-title']}>Навыки</legend>
        <div className={radioStyles['radio__filter-container']}>
          {groups.map((g) => {
            const allSelected = g.subIds.length > 0 && g.subIds.every((id) => selected.includes(id));
            const partial = !allSelected && g.subIds.some((id) => selected.includes(id));
            const isOpen = !!open[g.key];

            return (
              <div className={styles['skills-filter__group']} key={g.key}>
                <div className={styles['skills-filter__cat-row']}>
                  <button
                    type="button"
                    className={styles['skills-filter__cat-left']}
                    role="checkbox"
                    aria-checked={partial ? 'mixed' : allSelected}
                    onClick={() => dispatch(toggleCategory({ subcategoryIds: g.subIds }))}
                  >
                    <span
                      className={[
                        styles['skills-filter__indicator'],
                        allSelected ? styles['skills-filter__indicator--on'] : '',
                        partial ? styles['skills-filter__indicator--partial'] : '',
                      ].join(' ')}
                      aria-hidden="true"
                    />
                    <span className={styles['skills-filter__cat-title']}>{g.title}</span>
                  </button>

                  <button
                    type="button"
                    className={styles['skills-filter__chevron-btn']}
                    aria-label={isOpen ? 'Свернуть' : 'Развернуть'}
                    onClick={() => setOpen((s) => ({ ...s, [g.key]: !s[g.key] }))}
                  >
                    <svg
                      className={[
                        styles['skills-filter__chevron'],
                        isOpen ? styles['skills-filter__chevron--open'] : '',
                      ].join(' ')}
                      width="16"
                      height="8"
                      viewBox="0 0 16 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M15.3101 7.93308C15.1347 7.93308 14.9593 7.86847 14.8209 7.73003L8.803 1.71214C8.35997 1.26911 7.64003 1.26911 7.197 1.71214L1.17912 7.73003C0.911451 7.99769 0.468416 7.99769 0.20075 7.73003C-0.0669166 7.46236 -0.0669166 7.01933 0.20075 6.75166L6.21863 0.733775C7.197 -0.244592 8.79377 -0.244592 9.78137 0.733775L15.7992 6.75166C16.0669 7.01933 16.0669 7.46236 15.7992 7.73003C15.6608 7.85924 15.4854 7.93308 15.3101 7.93308Z"
                        fill="#253017"
                      />
                    </svg>
                  </button>
                </div>

                {isOpen && (
                  <div className={styles['skills-filter__sub-list']}>
                    <Checkbox
                      name={`skills-${g.key}`}
                      options={g.subIds.map((id, i) => ({ label: g.subTitles[i], value: id }))}
                      values={selected}
                      onChange={(value: string, nextChecked: boolean) => {
                        const id = String(value);
                        if (nextChecked) {
                          const next = Array.from(new Set([...selected, id]));
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
