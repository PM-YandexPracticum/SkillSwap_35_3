import { ActionBar } from '@/widgets';
import { Button, Title, Gallery } from '@/shared/ui';
/* import { useToggleLike } from '@/shared/hooks'; */
import { IconName } from '@/shared/ui';
import { CardDetailProps } from './types';

import styles from './CardDetail.module.css';

export const CardDetail = ({ skill }: CardDetailProps) => {
  if (!skill) {
    return null;
  }

  const { title, category, subcategory, description, images = [] } = skill;

  const actionBarButtons = [
    {
      iconName: 'like-icon' as IconName,
      iconNameActive: 'like-icon-fill' as IconName,
      active: false,
      onClick: () => console.log('Лайк'),
      ariaLabel: 'Добавить в избранное'
    },
    {
      iconName: 'share-icon' as IconName,
      onClick: () => console.log('Поделиться'),
      ariaLabel: 'Поделиться'
    },
    {
      iconName: 'more-square-icon' as IconName,
      onClick: () => console.log('Дополнительные действия'),
      ariaLabel: 'Дополнительные действия'
    }
  ];

  return (
    <div className={styles['card-detail']}>
      <ActionBar
        buttons={actionBarButtons}
        className={styles['card-detail__actionbar']}
      />
      <div className={styles['card-detail__header']}>
        <Title as='h1' size='xl'>
          {title}
        </Title>
        <p className={styles['card-detail__categories']}>
          {category} / {subcategory}
        </p>
      </div>
      <div className={styles['card-detail__content']}>
        <p className={styles['card-detail__description']}>{description}</p>
        <Button className={styles['card-detail__button']}>
          Предложить обмен
        </Button>
      </div>
      {images.length > 0 && (
        <Gallery
          images={images}
          title={title}
          className={styles['card-detail__gallery']}
        />
      )}
    </div>
  );
};
