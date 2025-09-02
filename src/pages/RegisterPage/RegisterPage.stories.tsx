import type { Meta, StoryObj } from '@storybook/react';
import RegisterPage from './RegisterPage';
import { formData } from '@/features/auth/RegistrationForm/type';
import { useState } from 'react';

const mockFormData: formData = {
 name: 'Анна Петрова',
 email: 'anna@example.com',
 password: 'password123',
 city: 'spb',
 gender: 'female',
 skills: ['it'],
 subSkills: ['react'],
 abilityTitle: 'IT Технологии',
 date: '2020-20-20',
 abilityOption: 'it',
 subAbilityOption: 'react',
 description: 'Ищу обмен навыками по веб-разработке',
 files: []
};

const mockCityOptions = [
 { value: 'moscow', label: 'Москва' },
 { value: 'spb', label: 'Санкт-Петербург' },
 { value: 'ekb', label: 'Екатеринбург' }]
;

const mockGenderOptions = [
 { value: 'male', label: 'Мужской' },
 { value: 'female', label: 'Женский' },
 { value: 'other', label: 'Другое' }]
;

const mockSkillsOptions = [
 { value: 'it', label: 'IT и технологии' },
 { value: 'design', label: 'Дизайн' },
 { value: 'marketing', label: 'Маркетинг' }]
;

const mockSubSkillsOptions = [
 { value: 'react', label: 'React' },
 { value: 'vue', label: 'Vue' },
 { value: 'node', label: 'Node.js' }]
;

const meta: Meta<typeof RegisterPage> = {
 title: 'Pages/RegisterPage',
 component: RegisterPage,
 tags: ['autodocs'],
 argTypes: {
 isOpen: {
 control: 'boolean',
 description: 'Открыто ли модальное окно регистрации'
 }
 }
};

export default meta;

type Story = StoryObj<typeof RegisterPage>;

export const Default: Story = {
 args: {
 isOpen: true,
 formData: mockFormData,
 city: mockCityOptions,
 gender: mockGenderOptions,
 skills: mockSkillsOptions,
 subSkills: mockSubSkillsOptions,
 },
 render: (args) => {
 const  [isOpen, setIsOpen]  = useState(args.isOpen);
 const handleClose =() => {
    setIsOpen(false)
 }
 return (
 <>
 <button
 style={{
 padding: '12px 24px',
 fontSize: '16px',
 backgroundColor: '#005fcc',
 color: 'white',
 border: 'none',
 borderRadius: '8px',
 cursor: 'pointer'
 }}
 onClick={() => setIsOpen(true)}
 >
 Открыть форму регистрации
 </button>

 <RegisterPage
 {...args}
 isOpen={isOpen}
 handleClose={
    handleClose
 }
 />
 </>
 );
 }
};