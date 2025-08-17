import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { RadioUI } from "./Radio";
import type { IRadioOption } from "./types";

const meta: Meta<typeof RadioUI> = {
  title: "Form/Radio",
  component: RadioUI,
  args: {
    name: "demo",
    options: [
      { value: "Не имеет значения", label: "Не имеет значения" },
      { value: "Мужской", label: "Мужской" },
      { value: "Женский", label: "Женский" }
    ] as IRadioOption[]
  },
  parameters: {
    docs: {
      description: {
        component:
          "Минимальные сторисы для RadioUI"
      }
    }
  }
};
export default meta;

type Story = StoryObj<typeof RadioUI>;

export const Basic: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>("Не имеет значения");
    return (
      <div>
        <span style={{ fontSize: 20, fontWeight: 550 }}>Пол автора</span>
        <div style={{ marginTop: 20}}>
          <RadioUI {...args} value={value} onChange={setValue} />
        </div>
        <div style={{ marginTop: 12 }}>Выбрано: {value}</div>
      </div>
    );
  }
};

export const DisabledItems: Story = {
  args: {
    options: [
      { value: "Не имеет значения", label: "Не имеет значения", disabled: true },
      { value: "Мужской", label: "Мужской" },
      { value: "Женский", label: "Женский", disabled: true }
    ]
  },
  render: (args) => {
    const [value, setValue] = useState<string>("Мужской");
    return (
      <div>
        <RadioUI {...args} value={value} onChange={setValue} />
        <div style={{ marginTop: 12 }}>Выбрано: {value}</div>
      </div>
    );
  }
};