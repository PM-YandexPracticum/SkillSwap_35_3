import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CheckboxUI } from './Checkbox';
import type { ICheckboxProps } from './types';

const meta: Meta<typeof CheckboxUI> = {
  title: 'UI/Checkbox',
  component: CheckboxUI,
  args: {
    name: 'demo',
    options: [
      { value: 'opt1', label: 'Вариант 1' },
      { value: 'opt2', label: 'Вариант 2' },
      { value: 'opt3', label: 'Вариант 3' }
    ] as ICheckboxProps['options'],
    variant: 'check'
  },
  parameters: {
    docs: {
      description: {
        component:
          'Минимальные сторисы для CheckboxUI (варианты: галочка и тире).'
      }
    }
  }
};
export default meta;

type Story = StoryObj<typeof CheckboxUI>;

export const Basic: Story = {
  render: (args) => {
    const [values, setValues] = useState<string[]>(['opt1']);

    const handleChange: ICheckboxProps['onChange'] = (value, checked) => {
      setValues((prev) =>
        checked
          ? Array.from(new Set([...prev, value]))
          : prev.filter((v) => v !== value)
      );
    };

    return (
      <div>
        <span style={{ fontSize: 20, fontWeight: 550 }}>Базовый чекбокс</span>
        <div style={{ marginTop: 16 }}>
          <CheckboxUI {...args} values={values} onChange={handleChange} />
        </div>
      </div>
    );
  }
};

export const DashVariant: Story = {
  args: {
    variant: 'dash'
  },
  render: (args) => {
    const [values, setValues] = useState<string[]>(['opt2']);
    const handleChange: ICheckboxProps['onChange'] = (value, checked) => {
      setValues((prev) =>
        checked
          ? Array.from(new Set([...prev, value]))
          : prev.filter((v) => v !== value)
      );
    };
    return (
      <div>
        <span style={{ fontSize: 20, fontWeight: 550 }}>Вариант «тире»</span>
        <div style={{ marginTop: 16 }}>
          <CheckboxUI {...args} values={values} onChange={handleChange} />
        </div>
      </div>
    );
  }
};

export const DisabledItems: Story = {
  args: {
    options: [
      { value: 'opt1', label: 'Недоступный 1', disabled: true },
      { value: 'opt2', label: 'Доступный' },
      { value: 'opt3', label: 'Недоступный 2', disabled: true }
    ]
  },
  render: (args) => {
    const [values, setValues] = useState<string[]>(['opt2']);
    const handleChange: ICheckboxProps['onChange'] = (value, checked) => {
      setValues((prev) =>
        checked
          ? Array.from(new Set([...prev, value]))
          : prev.filter((v) => v !== value)
      );
    };
    return (
      <div>
        <CheckboxUI {...args} values={values} onChange={handleChange} />
      </div>
    );
  }
};
