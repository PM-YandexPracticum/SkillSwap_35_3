import { jsx as _jsx } from "react/jsx-runtime";
import styles from './title.module.css';
export const Title = ({ as: Tag, size, className, children, ...rest }) => {
    const titleClasses = [styles.title, styles[size], className]
        .filter(Boolean)
        .join(' ');
    return (_jsx(Tag, { className: titleClasses, ...rest, children: children }));
};
