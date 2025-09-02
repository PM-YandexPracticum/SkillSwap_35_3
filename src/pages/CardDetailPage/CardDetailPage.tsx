import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './CardDetailPage.module.css';
import { useAppDispatch, useSelector } from '@/app/store';
import {
  fetchUsers,
  fetchUserByID
} from 'src/entities/User/thunks/usersThunks';
import {
  fetchSkills,
  fetchSkillById
} from 'src/entities/Skill/thunks/skillsThunk';

import {
  selectUsers,
  selectCurrentUser
} from '@/entities/User/selectors/usersSelectors';
import {
  selectSkills,
  selectSelectedSkill
} from '@/entities/Skill/selectors/skillsSelectors';

import { Card } from '@/widgets/Card';
import { CardDetail } from '@/widgets/CardDetail';
import { Title, Button } from '@/shared/ui';
import { useSlider } from '@/shared/hooks/useSlider';

const VISIBLE = 4;

const CardDetailPage = () => {
  const { id: idParam } = useParams();
  const id = Number(idParam);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const users = useSelector(selectUsers);
  const skills = useSelector(selectSkills);
  const currentUser = useSelector(selectCurrentUser);
  const selectedSkill = useSelector(selectSelectedSkill);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchSkills());
    if (Number.isFinite(id)) {
      dispatch(fetchUserByID(id));
      dispatch(fetchSkillById(id));
    }
  }, [dispatch, id]);

  const handleDetails = (uid: number) => navigate(`/card/${uid}`);

  const children = users
    .filter((user) => user.id !== id)
    .map((user) => (
      <Card
        key={user.id}
        user={user}
        skills={skills}
        onDetails={handleDetails}
        className={styles.cardItem}
      />
    ));

  const {
    visibleChildren,
    canScrollNext,
    canScrollPrev,
    handleNext,
    handlePrev
  } = useSlider({ visible: VISIBLE, children });

  return (
    <div className={styles.page}>
      <div className={styles.details}>
        <aside>
          {currentUser && skills.length ? (
            <Card
              user={currentUser}
              skills={skills}
              onDetails={handleDetails}
              showAbout
              className={styles.details_user}
              hideDetailsButton
            />
          ) : (
            <div>Загрузка профиля…</div>
          )}
        </aside>

        <main className={styles.main}>
          {selectedSkill ? (
            <CardDetail skill={selectedSkill} />
          ) : (
            <div>Загрузка навыка…</div>
          )}
        </main>
      </div>

      <section className={styles.users}>
        <div className={styles.users_title}>
          <Title as='h2' size='lg'>
            Похожие предложения
          </Title>
        </div>

        <div className={styles.users_panel}>
          {canScrollPrev && (
            <Button
              type='ghost'
              iconName='arrow-right-icon'
              className={`${styles.arrow} ${styles.arrow__left}`}
              aria-label='Назад'
              onClick={handlePrev}
            />
          )}

          <div className={styles.users_cards}>{visibleChildren}</div>

          {canScrollNext && (
            <Button
              type='ghost'
              iconName='arrow-right-icon'
              className={`${styles.arrow} ${styles.arrow__right}`}
              aria-label='Вперёд'
              onClick={handleNext}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default CardDetailPage;
