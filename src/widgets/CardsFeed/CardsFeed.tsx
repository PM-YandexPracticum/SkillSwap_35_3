import { useState } from 'react';
import { useSelector } from '@/app/store';
import cn from 'classnames';
import { selectSkills } from '@/entities/Skill/selectors/skillsSelectors';
import { selectFilteredUsers } from '@/entities/User/selectors/filteredUsersSelector';
import { selectFilters } from '@/entities/Filters/model/filtersSelectors';
import { Card } from '@/widgets';
import { Title, Button } from '@/shared/ui';
import { ICardsFeedProps } from './types';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './CardsFeed.module.css';

const PAGE_SIZE = 12;

export const CardsFeed = ({ usersData, skillsData }: ICardsFeedProps) => {
  const users = usersData ?? useSelector(selectFilteredUsers);
  const skills = skillsData ?? useSelector(selectSkills);
  const filters = useSelector(selectFilters);

  const hasActiveFilters =
    filters.mode !== 'all' ||
    filters.gender !== 'any' ||
    filters.cities.length > 0 ||
    filters.categories.length > 0 ||
    filters.q.trim().length > 0;

  const popularUsers = users.slice(0, 3);
  const newUsers = users.slice(3, 6);
  const recommendedUsers = users.slice(6);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [sortNewest, setSortNewest] = useState(false);

  const fetchMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const handleDetails = (id: number) => {
    alert(`Переход к деталям пользователя с id: ${id}`);
  };

  if (hasActiveFilters) {
    const sortedUsers = sortNewest
      ? [...users].sort((a, b) => b.id - a.id)
      : users;
    const visibleUsers = sortedUsers.slice(0, visibleCount);
    return (
      <section className={styles['cards-feed']}>
        <div className={styles['cards-feed__header']}>
          <Title as='h2' size='lg' className={styles['cards-feed__title']}>
            Подходящие предложения: {users.length}
          </Title>
          <Button
            className={cn(styles['cards-feed__button'], {
              [styles['cards-feed__sort_active']]: sortNewest
            })}
            type='tertiary'
            iconName='sort-icon'
            iconPosition='left'
            size='small'
            fill={sortNewest ? 'var(--background-color-secondary)' : undefined}
            stroke={
              sortNewest ? 'var(--background-color-secondary)' : undefined
            }
            onClick={() => setSortNewest((prev) => !prev)}
          >
            Сначала новые
          </Button>
        </div>
        <InfiniteScroll
          dataLength={visibleUsers.length}
          next={fetchMore}
          hasMore={visibleUsers.length < users.length}
          loader={<div>Загрузка...</div>}
        >
          <div className={styles['cards-feed__list']}>
            {visibleUsers.map((user) => (
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
      </section>
    );
  }

  const visibleRecommended = recommendedUsers.slice(0, visibleCount);

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
        className={`${styles['cards-feed__section']} ${styles['cards-feed__section_type_recommended']}`}
      >
        <Title as='h2' size='lg' className={styles['cards-feed__title']}>
          Рекомендуем
        </Title>
        <InfiniteScroll
          dataLength={visibleRecommended.length}
          next={fetchMore}
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
