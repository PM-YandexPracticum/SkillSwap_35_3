import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioFilter } from './RadioFilter';
import { RadioFilterProps } from './type';

type StoryArgs = RadioFilterProps;

const gender = ['Не имеет значения', 'Мужской', 'Женский'];

const mode = ['Всё', 'Хочу научиться', 'Могу научить'];

export default {
  title: 'UI/RadioFilter',
  component: RadioFilter,
  argTypes: {
    onChange: { action: 'changed' }
  }
} as Meta<StoryArgs>;

export const genderFilter: StoryObj<StoryArgs> = {
  render: () => {
    const [value, setValue] = useState<string>('Не имеет значения');
    return (
      <RadioFilter
        value={value}
        onChange={setValue}
        name='gender'
        radioList={gender}
        title='Пол автора'
      />
    );
  }
};

export const modeFilter: StoryObj<StoryArgs> = {
  render: () => {
    const [value, setValue] = useState<string>('Всё');
    return (
      <RadioFilter
        value={value}
        onChange={setValue}
        name='mode'
        radioList={mode}
      />
    );
  }
};
