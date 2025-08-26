import { Icon } from '../Icon';
import { Input } from './input';

export default {
  title: 'UI/Input',
  component: Input
};

export const Email = {
  args: {
    placeholder: 'Введите email'
  }
};

export const Search = {
  args: {
    placeholder: 'Искать навык',
    search: true,
    icon: <Icon name='search-icon' />,
    iconPosition: 'left'
  }
};

export const Data = {
  args: {
    icon: <Icon name='calendar-icon' />,
    iconPosition: 'right',
    placeholder: 'дд.мм.гггг'
  }
};

export const Password = {
  args: {
    type: 'password',
    placeholder: 'Придумайте надёжный пароль',
    iconPosition: 'right',
    icon: <Icon name='eye-icon' />
  }
};
