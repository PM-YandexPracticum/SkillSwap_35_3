import { useEffect } from 'react';
import styles from './HomePage.module.css';

import { useAppDispatch, useSelector } from '@/app/store';
import { fetchUsers } from 'src/entities/User/thunks/usersThunks';
import { fetchSkills } from 'src/entities/Skill/thunks/skillsThunk';

import { FiltersPanel } from '@/widgets/FiltersPanel/FiltersPanel';
import { CardsFeed } from '@/widgets/CardsFeed';
import { AppliedFiltersTabs } from '@/widgets/Filters';
import { selectActiveFilters } from '@/entities/Filters/model/filtersSelectors';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const activeFilters = useSelector(selectActiveFilters);
  const hasActiveFilters = activeFilters.length > 0;

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchSkills());
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <aside className={styles.main__filters}>
        <FiltersPanel />
      </aside>

      <section className={styles.main__content}>
        {hasActiveFilters && (
          <div className={styles.content__chipsRow}>
            <AppliedFiltersTabs />
          </div>
        )}
        <CardsFeed />
      </section>
    </div>
  );
};

export default HomePage;
