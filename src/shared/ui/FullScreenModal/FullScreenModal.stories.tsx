import { Meta, StoryObj } from '@storybook/react';
import { FullScreenModal } from './FullScreenModal';
import { FullScreenModalProps } from './type';
import { useState } from 'react';

const MetaData: Meta<typeof FullScreenModal> = {
  title: 'UI/FullScreenModal',
  component: FullScreenModal,
  argTypes: {
    isOpen: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' }
  }
} as Meta<typeof FullScreenModal>;

export default MetaData;

type Story = StoryObj<FullScreenModalProps>;

export const Default: Story = {
  args: {
    closeOnEsc: true
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button onClick={() => setIsOpen(true)}>Открыть модальное окно</button>
        <FullScreenModal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        ></FullScreenModal>
      </>
    );
  }
};

export const WithoutEscClose: Story = {
  args: {
    closeOnEsc: false
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button onClick={() => setIsOpen(true)}>Открыть модальное окно</button>
        <FullScreenModal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        ></FullScreenModal>
      </>
    );
  }
};
