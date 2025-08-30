import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '@/app/store';
import { selectSkills } from '@/entities/Skill/selectors/skillsSelectors';
import { selectFilteredUsers } from '@/entities/User/selectors/filteredUsersSelector';
import { Card } from '@/widgets';
import { Title, Button } from '@/shared/ui';
import { ICardsFeedProps } from './types';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './CardsFeed.module.css';

const PAGE_SIZE = 12;

export const CardsFeed = ({ usersData, skillsData }: ICardsFeedProps) => {
  const navigate = useNavigate();

  const users = usersData ?? useSelector(selectFilteredUsers);
  const skills = skillsData ?? useSelector(selectSkills);

  const popularUsers = users.slice(0, 3);
  const newUsers = users.slice(3, 6);
  const recommendedUsers = users.slice(6);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleRecommended = recommendedUsers.slice(0, visibleCount);

  const fetchMoreRecommended = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const handleDetails = (id: number) => {
    navigate(`/card/${id}`);
  };

  return (
    <section className={styles['cards-feed']}>
      {/* Популярное */}
      <div className={styles['cards-feed__section']}>
        <div className={styles['cards-feed__header']}>
          <Title as='h2' size='lg' className={styles['cards-feed__title']}>
            Популярное
          </Title>
          <Button
            className={styles['cards-feed__button']}
            type='tertiary'
            iconName='arrow-right-icon'
            iconPosition='right'
            size='small'
            onClick={() => {}}
          >
            Смотреть все
          </Button>
        </div>
        <div className={styles['cards-feed__list']}>
          {popularUsers.map((user) => (
            <Card
              key={user.id}
              className={styles['cards-feed__item']}
              user={user}
              skills={skills}
              onDetails={handleDetails}
            />
          ))}
        </div>
      </div>
      {/* Новое */}
      <div className={styles['cards-feed__section']}>
        <div className={styles['cards-feed__header']}>
          <Title as='h2' size='lg' className={styles['cards-feed__title']}>
            Новое
          </Title>
          <Button
            className={styles['cards-feed__button']}
            type='tertiary'
            iconName='arrow-right-icon'
            iconPosition='right'
            size='small'
            onClick={() => {}}
          >
            Смотреть все
          </Button>
        </div>
        <div className={styles['cards-feed__list']}>
          {newUsers.map((user) => (
            <Card
              key={user.id}
              className={styles['cards-feed__item']}
              user={user}
              skills={skills}
              onDetails={handleDetails}
            />
          ))}
        </div>
      </div>
      {/* Рекомендуемое */}
      <div
        className={`
        ${styles['cards-feed__section']}
        ${styles['cards-feed__section_type_recommended']}
      `}
      >
        <Title as='h2' size='lg' className={styles['cards-feed__title']}>
          Рекомендуем
        </Title>
        <InfiniteScroll
          dataLength={visibleRecommended.length}
          next={fetchMoreRecommended}
          hasMore={visibleRecommended.length < recommendedUsers.length}
          loader={<div>Загрузка...</div>}
        >
          <div className={styles['cards-feed__list']}>
            {visibleRecommended.map((user) => (
              <Card
                key={user.id}
                className={styles['cards-feed__item']}
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
