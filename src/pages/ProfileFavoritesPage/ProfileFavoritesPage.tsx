import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '@/app/store';
import { selectSkills } from '@/entities/Skill/selectors/skillsSelectors';
import { selectUsers } from '@/entities/User/selectors/usersSelectors';
import { useLikes } from '@/features/favorites/hooks/useLikes';
import { Card } from '@/widgets';
import { Title } from '@/shared/ui';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './ProfileFavoritesPage.module.css';

const PAGE_SIZE = 12;

export const ProfileFavoritesPage = () => {
  const navigate = useNavigate();
  const { likedItems } = useLikes();
  const allUsers = useSelector(selectUsers);
  const skills = useSelector(selectSkills);

  const likedUsers = useMemo(() => {
    const likedSet = new Set(likedItems);
    return allUsers.filter((user) => likedSet.has(user.id.toString()));
  }, [allUsers, likedItems]);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const fetchMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const handleDetails = useCallback(
    (id: number) => {
      navigate(`/card/${id}`);
    },
    [navigate]
  );

  const visibleUsers = likedUsers.slice(0, visibleCount);
  const hasMore = visibleUsers.length < likedUsers.length;

  if (likedUsers.length === 0) {
    return (
      <section className={styles['favorites-feed']}>
        <div className={styles['favorites-feed__empty']}>
          <Title as='h2' size='lg'>
            Ваше избранное пусто
          </Title>
          <p>Добавляйте пользователей в избранное, нажимая на сердечко</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles['favorites-feed']}>
      <div className={styles['favorites-feed__wrapper']}>
        <InfiniteScroll
          dataLength={visibleUsers.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={<div className={styles['loader']}>Загрузка</div>}
          style={{ overflow: 'unset' }}
        >
          <div className={styles['favorites-feed__list']}>
            {visibleUsers.map((user) => (
              <Card
                key={user.id}
                user={user}
                skills={skills}
                onDetails={handleDetails}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default ProfileFavoritesPage;
