import styles from './ActionBar.module.css';
import { ActionBarProps } from './types';
import { Button } from '../Button';

export const ActionBar = ({ buttons, className }: ActionBarProps) => {
  return (
    <div className={`${styles['action-bar']} ${className || ''}`}>
      {buttons.map((button, index: number) => (
        <Button
          key={`${button.iconName}-${index}`}
          iconName={
            button.active
              ? button.iconNameActive || button.iconName
              : button.iconName
          }
          iconSize={button.size || 24}
          onClick={button.onClick}
          type={button.type || 'ghost'}
          aria-label={button.ariaLabel}
          className={button.className}
        />
      ))}
    </div>
  );
};
