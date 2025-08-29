import { useEffect } from 'react';

import styles from './HomePage.module.css';

import { useAppDispatch } from '@/app/store';
import { fetchUsers } from 'src/entities/User/thunks/usersThunks';
import { fetchSkills } from 'src/entities/Skill/thunks/skillsThunk';

import { FiltersPanel } from '@/widgets/FiltersPanel/FiltersPanel';
import { CardsFeed } from '@/widgets/CardsFeed';

export const HomePage = () => {
  const dispatch = useAppDispatch();

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
        <CardsFeed />
      </section>
    </div>
  );
};

export default HomePage;