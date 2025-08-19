export type SvgIconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

export type IconName =
  // Категории
  | 'category-business-icon'
  | 'category-art-icon'
  | 'category-lifestyle-icon'
  | 'category-education-icon'
  | 'category-household-icon'
  | 'category-language-icon'

  // Стрелки, крестики, сортировка
  | 'arrow-up-icon'
  | 'arrow-down-icon'
  | 'arrow-right-icon'
  | 'close-icon'
  | 'sort-icon'

  // Кнопки
  | 'heart-icon'
  | 'clock-icon'
  | 'edit-icon'
  | 'share-icon'
  | 'like-icon'
  | 'more-square-icon'
  | 'gallery-add-icon'

  // Инпуты
  | 'add-avatar-icon'
  | 'calendar-icon'
  | 'eye-icon'
  | 'search-icon'

  // Оповещения, тема, фидбэк
  | 'notification-icon'
  | 'theme-icon'
  | 'done-icon'

  // Соцсети
  | 'apple-icon'
  | 'google-icon'

  // Другое
  | 'user-circle-icon'
  | 'logo-icon';

export interface IconProps {
  name: IconName;
  size?: number | string;
  color?: string;
  fill?: string;
  className?: string;
  onClick?: () => void;
  'aria-label'?: string;
}
