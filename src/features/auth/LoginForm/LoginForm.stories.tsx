import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { LoginForm } from './LoginForm';
import { LoginFormProps } from './types';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/app/store';

import { selectAuthIsLoading, selectAuthError } from '@/features/auth/selectors/authSelectors';

// Создаем mock store для Storybook
const store = configureStore({ reducer: rootReducer });

export default {
  title: 'Auth/LoginForm',
  component: LoginForm,
  decorators: [
    (StoryComponent) => (
      <Provider store={store}>
        <StoryComponent />
      </Provider>
    ),
  ],
  argTypes: {
    onLoginSuccess: { action: 'Login Success' },
    onSwitchToRegister: { action: 'Switch to Register' },
  },
} as Meta;

// Базовый шаблон
const Template: StoryFn<LoginFormProps> = (args) => <LoginForm {...args} />;

// История с изображением и состоянием загрузки
export const Default = Template.bind({});
Default.args = {
  onLoginSuccess: () => alert('Успешный вход!'),
  onSwitchToRegister: () => alert('Переключение на регистрацию'),
};
Default.storyName = 'Основной вид';

export const LoadingState = Template.bind({});
LoadingState.args = {
  onLoginSuccess: () => alert('Успешный вход!'),
  onSwitchToRegister: () => alert('Переключение на регистрацию'),
  // Можно передать пропс loading, если компонент его поддерживает
  // или мокировать селектор isLoading
};
LoadingState.storyName = 'Загрузка';

export const WithError = Template.bind({});
WithError.args = {
  onLoginSuccess: () => alert('Успешный вход!'),
  onSwitchToRegister: () => alert('Переключение на регистрацию'),
};
// Можно дополнительно мокировать селектор ошибки, если нужно

// Для отображения изображения, убедитесь, что в компоненте используется правильный src
// и что изображение доступно по пути, который вы передаете в steps.welcomeBack.imageSrc