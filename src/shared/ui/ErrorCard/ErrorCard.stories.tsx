// src/components/ErrorCard.stories.tsx
import React from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { ErrorCard } from './ErrorCard';
import { ErrorCardProps } from './types';

// Импорт изображения
import error404 from '@/shared/assets/images/error404.png';

// Настройка метаданных для Storybook
export default {
  title: 'Components/ErrorCard',
  component: ErrorCard,
  argTypes: {
    onRetry: { action: 'retry clicked' },
    onGoHome: { action: 'go home clicked' }
  }
} as Meta<ErrorCardProps>;

// Создаем шаблон истории
const Template: StoryFn<ErrorCardProps> = (args) => <ErrorCard {...args} />;

// История с изображением и кнопками "Сообщить об ошибке" и "На главную"
export const WithRetryAndGoHome = Template.bind({});
WithRetryAndGoHome.args = {
  title: 'Страница не найдена',
  description:
    'К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже.',
  imageSrc: error404,
  onRetry: () => alert('Обработка ошибки отправлена'),
  onGoHome: () => alert('Переход на главную')
};
