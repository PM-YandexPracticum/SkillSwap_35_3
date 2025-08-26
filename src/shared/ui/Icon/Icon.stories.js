import { Icon } from './Icon';
const meta = {
    title: 'Shared/Icon',
    component: Icon
};
export default meta;
export const Basic = {
    args: {
        name: 'calendar-icon',
        size: 48
    }
};
export const Fill = {
    args: {
        name: 'add-avatar-icon',
        size: 24,
        fill: '#ABD27A'
    }
};
export const Stroke = {
    args: {
        name: 'user-circle-icon',
        size: 78,
        fill: 'none',
        color: '#ABD27A'
    }
};
export const CustomClass = {
    args: {
        name: 'gallery-add-icon',
        className: 'my-custom-class'
    }
};
