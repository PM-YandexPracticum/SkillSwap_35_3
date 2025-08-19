import * as Icons from '@/shared/assets/icons';
import { IconName, SvgIconComponent } from './types';

export const iconMap: Record<IconName, SvgIconComponent> = {
  // Категории
  'category-business-icon': Icons.BusinessIcon,
  'category-art-icon': Icons.ArtIcon,
  'category-lifestyle-icon': Icons.LifestyleIcon,
  'category-education-icon': Icons.EducationIcon,
  'category-household-icon': Icons.HouseholdIcon,
  'category-language-icon': Icons.LanguageIcon,

  // Стрелки, крестики, сортировка
  'arrow-up-icon': Icons.ArrorUpIcon,
  'arrow-down-icon': Icons.ArrorDownIcon,
  'arrow-right-icon': Icons.ArrorRightIcon,
  'close-icon': Icons.CrossIcon,
  'sort-icon': Icons.SortIcon,

  // Кнопки
  'heart-icon': Icons.LikeIcon,
  'clock-icon': Icons.ClockIcon,
  'edit-icon': Icons.EditIcon,
  'share-icon': Icons.ShareIcon,
  'like-icon': Icons.LikeIcon,
  'more-square-icon': Icons.MoreSquareIcon,
  'gallery-add-icon': Icons.GalleryAddIcon,

  // Инпуты
  'add-avatar-icon': Icons.AddAvatarIcon,
  'calendar-icon': Icons.CalendarIcon,
  'eye-icon': Icons.EyeIcon,
  'search-icon': Icons.SearchIcon,

  // Оповещения, тема, галочка
  'notification-icon': Icons.NotificationIcon,
  'theme-icon': Icons.MoonIcon,
  'done-icon': Icons.DoneIcon,

  // Соцсети
  'google-icon': Icons.GoogleIcon,
  'apple-icon': Icons.AppleIcon,

  // Другое
  'user-circle-icon': Icons.UserCircleIcon,
  'logo-icon': Icons.LogoIcon
};
