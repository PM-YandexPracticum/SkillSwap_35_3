import React from 'react';
import { CardProps } from './types';
import { Button, Tag, Avatar } from '@/shared/ui';
import { useAge } from '@/shared/hooks/useAge/useAge';

import styles from './Card.module.css';

export function Card({ user, skills, onDetails }: CardProps) {
  const age = useAge(user.birthDate);

  const teachSkill = skills.find((s) => s.id === user.teachingSkillId);
  const learnSkills = skills.filter((s) =>
    user.learningSkillIds.includes(s.id)
  );
  const learnToShow = learnSkills.slice(0, 2);
  const learnExtra = learnSkills.length - learnToShow.length;

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        {/* AuthorPreview вставить, когда компонент будет готов */}
        <Avatar
          src={user.avatar}
          alt={user.name}
          className={styles.card__avatar}
        />
        <div className={styles.card__info}>
          <div className={styles.card__name}>{user.name}</div>
          <div className={styles.card__details}>
            {user.city}, {age}
          </div>
        </div>
      </div>

      <div className={styles.card__block}>
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
        <div className={styles.card__button}>
          <Button onClick={() => onDetails(user.id)} fullWidth>
            Подробнее
          </Button>
        </div>
      </div>
    </div>
  );
}
