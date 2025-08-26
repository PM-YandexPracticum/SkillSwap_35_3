import { CardProps } from './types';
import { Button, Tag, Avatar } from '@/shared/ui';
import { useAge } from '@/shared/hooks/useAge/useAge';
import { toggleLike } from '@/features/favorites/toggle-like/toggleLike';

import styles from './Card.module.css';

export const Card = ({
  user,
  skills,
  onDetails,
  showAbout,
  className
}: CardProps) => {
  const age = useAge(user.birthDate);

  //const isAuth - проверка авторизации для лайка

  const { isLiked, toggle } = toggleLike({
    defaultLiked: false, //
    onToggle: (liked) => {
      // ЗАМЕНИТЬ потенциально на полноценную реализацию хранения лайков
      console.log('Card liked:', liked);
    }
  });

  const teachSkill = skills.find((s) => s.id === user.teachingSkillId);
  const learnSkills = skills.filter((s) =>
    user.learningSkillIds.includes(s.id)
  );
  const learnToShow = learnSkills.slice(0, 2);
  const learnExtra = learnSkills.length - learnToShow.length;

  return (
    <div className={`${styles.card} ${className || ''}`}>
      <div className={styles.card__header}>
        <div className={styles['card__button-like_container']}>
          <Button
            iconName={isLiked ? 'like-icon-fill' : 'like-icon'}
            type='ghost'
            onClick={toggle}
            className={
              isLiked
                ? styles['card__button-like_active']
                : styles['card__button-like']
            }
          />
        </div>
        <Avatar
          src={user.avatar}
          alt={user.name}
          className={styles['card__header-avatar']}
        />
        <div className={styles['card__header-info']}>
          <div className={styles['card__header-name']}>{user.name}</div>
          <div className={styles['card__header-details']}>
            {user.city}, {age}
          </div>
        </div>
      </div>

      <div className={styles.card__block}>
        {showAbout && user.about && (
          <div className={styles.card__about}>{user.about}</div>
        )}
        <span className={styles['card__tags-title']}>Может научить:</span>
        <div className={styles.card__tags}>
          {teachSkill ? (
            <Tag
              text={teachSkill.title}
              category={teachSkill.category}
              subcategory={teachSkill.subcategory}
            />
          ) : (
            <span className={styles.card__empty}>Навыков для обучения нет</span>
          )}
        </div>

        <span className={styles['card__tags-title']}>Хочет научиться:</span>
        <div className={styles.card__tags}>
          {learnToShow.length > 0 ? (
            <>
              {learnToShow.map((skill) => (
                <Tag
                  key={skill.id}
                  text={skill.subcategory}
                  category={skill.category}
                  subcategory={skill.subcategory}
                />
              ))}
              {learnExtra > 0 && (
                <Tag text={`+${learnExtra}`} category='' subcategory='' />
              )}
            </>
          ) : (
            <span className={styles.card__empty}>Нет выбранных навыков</span>
          )}
        </div>
      </div>
      <div className={styles.card__button}>
        <Button onClick={() => onDetails(user.id)} fullWidth>
          Подробнее
        </Button>
      </div>
    </div>
  );
};
