import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioFilter } from './RadioFilter';
import { RadioFilterProps } from './type';

type StoryArgs = RadioFilterProps;

const gender = [
  {
    label: 'Не имеет значения',
    value: 'default'
  },
  {
    label: 'Мужской',
    value: 'm'
  },
  {
    label: 'Женский',
    value: 'f'
  }
];

const mode = [
  {
    label: 'Всё',
    value: 'all'
  },
  {
    label: 'Хочу научиться',
    value: 'learn'
  },
  {
    label: 'Могу научить',
    value: 'teach'
  }
];

export default {
  title: 'UI/RadioFilter',
  component: RadioFilter,
  argTypes: {
    onChange: { action: 'changed' }
  }
} as Meta<StoryArgs>;

export const genderFilter: StoryObj<StoryArgs> = {
  render: () => {
    const [value, setValue] = useState<string>('default');
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
    const [value, setValue] = useState<string>('all');
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
