import type { Meta, StoryObj } from '@storybook/react';
import { Gallery } from './Gallery';

const mockImages = [
  'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800',
  'https://images.unsplash.com/photo-1707904112367-eab8c5f2912f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1681459876999-4f6cd1164e4c?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1634906344066-2c9dfd5e8ef7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1603119574997-c50fd39f8375?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

const meta: Meta<typeof Gallery> = {
  title: 'widgets/CardDetail/Gallery',
  component: Gallery,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент галереи с основным слайдером и превью-миниатюрами.'
      }
    }
  },
  argTypes: {
    images: {
      description: 'Массив URL-адресов изображений',
      control: 'object'
    },
    title: {
      description: 'Заголовок, используемый в alt-тегах для доступности',
      control: 'text'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithCounter: Story = {
  args: {
    images: mockImages,
    title: 'Тайм-менеджмент'
  }
};

export const ThreeImages: Story = {
  args: {
    images: mockImages.slice(0, 3),
    title: 'Тайм-менеджмент'
  }
};

export const SingleImage: Story = {
  args: {
    images: mockImages.slice(0, 1),
    title: 'Тайм-менеджмент'
  }
};
