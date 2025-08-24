// src/components/ErrorCard.stories.tsx
import React from 'react';

import { Meta, StoryFn} from '@storybook/react';

import { ErrorCard, ErrorCardProps } from './ErrorCard';

// Настройка метаданных для Storybook
export default {
  title: 'Components/ErrorCard',
  component: ErrorCard,
  argTypes: {
    onRetry: { action: 'retry clicked' },
    onGoHome: { action: 'go home clicked' },
  },
} as Meta;

// Базовая история с всеми пропсами
const Template: StoryFn<ErrorCardProps> = (args) => <ErrorCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Можно оставить пустым, чтобы использовать значения по умолчанию
};

export const WithRetryAndGoHome = Template.bind({});
WithRetryAndGoHome.args = {
  title: 'Страница не найдена',
  message: 'К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже.',
  onRetry: () => alert('Обработка ошибки отправлена'),
  onGoHome: () => alert('Переход на главную'),
};