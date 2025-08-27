import React, { useEffect } from 'react';

import styles from './HomePage.module.css';

import { useDispatch, useSelector } from '@/app/store';
import { fetchUsers } from 'src/entities/User/thunks/usersThunks';
import { fetchSkills } from 'src/entities/Skill/thunks/skillsThunk';

//import { selectUsers } from '@/entities/User/selectors/usersSelectors';
//import { selectSkills } from '@/entities/Skill/selectors/skillsSelectors';

//import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
//import { FiltersPanel } from '@/widgets/CardsFeed';
import { CardsFeed } from '@/widgets/CardsFeed';

export const HomePage = () => {
  const dispatch = useDispatch();

  // Получаем данные из стора
  //const users = useSelector(selectUsers);
  //const skills = useSelector(selectSkills);

  useEffect(() => {
    dispatch(fetchUsers()); // Загружаем список пользователей при монтировании компонента
    dispatch(fetchSkills()); // Загружаем список навыков при монтировании компонента
  }, [dispatch]);

  return (
    <div className={styles.page}>
      {/* <Header /> */}
      <div className={styles.header}>Заглушка Header</div>

      <main className={styles.main}>
        {/* <FiltersPanel /> */}
        <div className={styles.main__filters}>Заглушка Фильтры</div>

        <CardsFeed />
        {/* <div className={styles.main__cards}>Заглушка карточки</div> */}
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
