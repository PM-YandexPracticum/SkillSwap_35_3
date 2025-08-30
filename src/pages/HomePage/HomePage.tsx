import React, { useEffect } from 'react';

import styles from './HomePage.module.css';

import { useAppDispatch } from '@/app/store';
import { fetchUsers } from 'src/entities/User/thunks/usersThunks';
import { fetchSkills } from 'src/entities/Skill/thunks/skillsThunk';

//import { FiltersPanel } from '@/widgets/CardsFeed';
import { CardsFeed } from '@/widgets/CardsFeed';

export const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers()); // Загружаем список пользователей при монтировании компонента
    dispatch(fetchSkills()); // Загружаем список навыков при монтировании компонента
  }, [dispatch]);

  return (
    <div className={styles.page}>
      {/* <FiltersPanel /> */}
      <div className={styles.main__filters}>Заглушка Фильтры</div>

      <CardsFeed />
    </div>
  );
};

export default HomePage;
