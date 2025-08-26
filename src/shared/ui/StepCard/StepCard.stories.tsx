import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { StepCard } from './StepCard'; // путь к вашему компоненту
import { steps } from '@/shared/lib/constants/steps'; // путь к вашим константам

// Типизация для Storybook
export default {
  title: 'Components/StepCard',
  component: StepCard,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    imageSrc: { control: 'select', options: Object.values(steps).map(step => step.imageSrc) }
  }
} as Meta;

// Создаем шаблон
const Template: StoryFn<{
  title: string;
  description: string;
  imageSrc: React.FC<React.SVGProps<SVGSVGElement>>;
}> = (args) => <StepCard {...args} />;

// Создаем истории для каждого варианта
export const WelcomeBack = Template.bind({});
WelcomeBack.args = {
  title: steps.welcomeBack.title,
  description: steps.welcomeBack.description,
  imageSrc: steps.welcomeBack.imageSrc
};

export const Registration1 = Template.bind({});
Registration1.args = {
  title: steps.registration1.title,
  description: steps.registration1.description,
  imageSrc: steps.registration1.imageSrc
};

export const Registration2 = Template.bind({});
Registration2.args = {
  title: steps.registration2.title,
  description: steps.registration2.description,
  imageSrc: steps.registration2.imageSrc
};

export const Registration3 = Template.bind({});
Registration3.args = {
  title: steps.registration3.title,
  description: steps.registration3.description,
  imageSrc: steps.registration3.imageSrc
};
