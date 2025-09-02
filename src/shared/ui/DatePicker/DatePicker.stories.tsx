import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BirthDatePicker, BirthDatePickerProps } from './DatePicker';

const meta: Meta<typeof BirthDatePicker> = {
  title: 'UI/DatePicker',
  component: BirthDatePicker,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: { description: { component: 'Поле выбора даты рождения с попап-календарём, RU-локаль, кнопки Отменить/Выбрать.' } },
  },
  args: {
    value: null,
    placeholder: 'ДД.ММ.ГГГГ',
    minDate: new Date(1900, 0, 1),
    maxDate: new Date(),
    disabled: false,
  },
  argTypes: {
    onChange: { action: 'changed', table: { category: 'Events' } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320, padding: 24 }}>
        <label style={{ display: 'grid', gap: 8 }}>
          <span style={{ color: '#39412e' }}>Дата рождения</span>
          <Story />
        </label>
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof BirthDatePicker>;

// Локальный контроллер, чтобы жить без useArgs
const Local: React.FC<BirthDatePickerProps> = (props) => {
  const [v, setV] = useState<Date | null>(props.value ?? null);
  return (
    <BirthDatePicker
      {...props}
      value={v}
      onChange={(d) => {
        setV(d);
        // прокинем наружу, чтобы в Actions было видно
        props.onChange?.(d);
      }}
    />
  );
};

export const Basic: Story = {
  name: 'Базовый',
  render: (args: any) => <Local {...args} />,
};

export const WithInitialValue: Story = {
  name: 'С предустановленной датой',
  render: (args: any) => <Local {...args} value={new Date(1995, 9, 28)} />, // 28.10.1995
};

export const Disabled: Story = {
  name: 'Заблокирован',
  render: (args: any) => <Local {...args} disabled />,
};