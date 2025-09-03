import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dropdown } from './Dropdown';
import type { DropdownOption } from './types';

const meta: Meta<typeof Dropdown> = {
  title: 'UI/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

const genderOptions: DropdownOption[] = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
  { value: 'none', label: 'Не указан' }
];

const skillOptions: DropdownOption[] = [
  { value: 'music', label: 'Музыка' },
  { value: 'drawing', label: 'Рисование' },
  { value: 'sport', label: 'Спорт' },
  { value: 'writing', label: 'Письмо' }
];

const SingleWrapper = (props: { options: DropdownOption[] }) => {
  const [value, setValue] = useState('');
  return (
    <Dropdown
      label='Пол'
      placeholder='Не указан'
      options={props.options}
      value={value}
      onChange={(v) => typeof v === 'string' && setValue(v)} // Гарантируем string
    />
  );
};

const MultiWrapper = (props: { options: DropdownOption[] }) => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <Dropdown
      multiple
      label='Навыки'
      placeholder='Выберите навыки'
      options={props.options}
      value={value}
      onChange={(v) => Array.isArray(v) && setValue(v)}
    />
  );
};

export const SingleChoice: Story = {
  render: () => <SingleWrapper options={genderOptions} />
};
export const MultipleCheckboxes: Story = {
  render: () => <MultiWrapper options={skillOptions} />
};
