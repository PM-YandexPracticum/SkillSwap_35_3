import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ModalOverlayUI } from './ModalOverlay';

export default {
  title: 'Components/ModalOverlay',
  component: ModalOverlayUI,
  argTypes: {
    onClose: { action: 'closed' },
    'data-cy': { control: 'text' }
  },
} as Meta;

const Template: StoryFn<{ onClose: () => void; 'data-cy'?: string }> = (
  args
) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    args.onClose();
  };

  return (
    <>
      {isOpen && <ModalOverlayUI {...args} onClose={handleClose} />}
      {!isOpen && <button onClick={() => setIsOpen(true)}>Open Overlay</button>}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  'data-cy': 'overlay'
};
