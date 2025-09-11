import { useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './CardDetailPage.module.css';
import { useAppDispatch, useSelector } from '@/app/store';
import { fetchUserByID } from 'src/entities/User/thunks/usersThunks';
import { fetchSkillById } from 'src/entities/Skill/thunks/skillsThunk';
import {
  selectUsers,
  selectCurrentUser
} from '@/entities/User/selectors/usersSelectors';
import {
  selectSkills,
  selectSelectedSkill
} from '@/entities/Skill/selectors/skillsSelectors';
import { Card, CardDetail } from '@/widgets';
import { Title, Slider } from '@/shared/ui';

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
    if (Number.isFinite(id)) dispatch(fetchUserByID(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentUser?.teachingSkillId) {
      dispatch(fetchSkillById(currentUser.teachingSkillId));
    }
  }, [dispatch, currentUser?.teachingSkillId]);

  const onDetails = useCallback(
    (uid: number) => navigate(`/card/${uid}`),
    [navigate]
  );

  const offerCards = useMemo(
    () =>
      users
        .filter((user) => user.id !== id)
        .map((user) => (
          <Card
            key={user.id}
            user={user}
            skills={skills}
            onDetails={onDetails}
          />
        )),
    [users, skills, id, onDetails]
  );

  return (
    <div className={styles.page}>
      <div className={styles.details}>
        <aside>
          {currentUser ? (
            <Card
              user={currentUser}
              skills={skills}
              onDetails={onDetails}
              showAbout
              hideDetailsButton
              className={styles.details_user}
            />
          ) : (
            <div>Загрузка профиля…</div>
          )}
        </aside>

        {selectedSkill ? (
          <CardDetail skill={selectedSkill} />
        ) : (
          <div>Загрузка навыка…</div>
        )}
      </div>

      <section className={styles.users}>
        <div className={styles.users_title}>
          <Title as='h2' size='lg'>
            Похожие предложения
          </Title>
        </div>

        {offerCards.length > 0 ? (
          <Slider
            visible={4}
            buttonPosition='edges'
            ariaLabel='Слайдер похожих предложений'
            ariaLabelPrev='Назад'
            ariaLabelNext='Вперёд'
          >
            {offerCards}
          </Slider>
        ) : (
          <div>Похожие предложения не найдены…</div>
        )}
      </section>
    </div>
  );
};

export default CardDetailPage;
