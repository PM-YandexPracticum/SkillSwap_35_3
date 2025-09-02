import { useAppDispatch, useSelector } from '@/app/store';
import { Tag } from '@/shared/ui';
import { selectActiveFilters } from '@/entities/Filters/model/filtersSelectors';
import {
  setMode,
  setGender,
  setCities,
  toggleSkill,
  setQuery
} from '@/entities/Filters/model/filtersSlice';
import styles from './AppliedFiltersTabs.module.css';

export function AppliedFiltersTabs() {
  const dispatch = useAppDispatch();
  const activeFilters = useSelector(selectActiveFilters);

  const cityValues = activeFilters
    .filter((f) => f.type === 'city')
    .map((f) => f.value);

  const tabs = activeFilters
    .map(({ type, value, label }) => {
      switch (type) {
        case 'mode':
          return {
            key: 'mode',
            text: label,
            onClose: () => dispatch(setMode('all'))
          };
        case 'gender':
          return {
            key: 'gender',
            text: label,
            onClose: () => dispatch(setGender('any'))
          };
        case 'city':
          return {
            key: `city-${value}`,
            text: label,
            onClose: () =>
              dispatch(setCities(cityValues.filter((c) => c !== value)))
          };
        case 'category':
          return {
            key: `skill-${value}`,
            text: label,
            onClose: () => dispatch(toggleSkill(String(value)))
          };
        case 'query':
          return {
            key: 'query',
            text: label,
            onClose: () => dispatch(setQuery(''))
          };
        default:
          return null;
      }
    })
    .filter(Boolean) as { key: string; text: string; onClose: () => void }[];

  if (tabs.length === 0) return null;

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <div key={tab.key} className={styles.tab} onClick={tab.onClose}>
          <Tag
            text={tab.text}
            style={{
              backgroundColor: 'var(--background-color-secondary)',
              borderRadius: '12px',
              padding: '12px 44px 12px 24px'
            }}
          />
          <button
            type='button'
            className={styles.close}
            aria-label={`Удалить фильтр ${tab.text}`}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default AppliedFiltersTabs;
