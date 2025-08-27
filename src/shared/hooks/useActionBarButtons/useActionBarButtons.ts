import { useSelector } from '@/app/store';
import { selectIsAuthenticated } from '@/features/auth';
import { ActionBarButtonConfig } from '@/widgets/ActionBar/types';

/**
 * Хук для формирования конфигурации кнопок ActionBar
 * Возвращает массив кнопок в зависимости от статуса аутентификации пользователя
 */

export const useActionBarButtons = (): ActionBarButtonConfig[] => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const baseButtons: ActionBarButtonConfig[] = [
    {
      iconName: 'theme-icon',
      type: 'ghost',
      onClick: () => console.log('Смена темы'),
      ariaLabel: 'Смена темы'
    }
  ];

  if (!isAuthenticated) {
    return baseButtons;
  }

  return [
    ...baseButtons,
    {
      iconName: 'notification-icon',
      type: 'ghost',
      onClick: () => console.log('Уведомления'),
      ariaLabel: 'Уведомления'
    },
    {
      iconName: 'heart-icon',
      type: 'ghost',
      onClick: () => console.log('Избранное'),
      ariaLabel: 'Избранное'
    }
  ];
};
