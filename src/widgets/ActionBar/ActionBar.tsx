import { useNavigate } from 'react-router-dom';
import styles from './ActionBar.module.css';
import { ActionBarProps } from './types';
import { Button } from '@/shared/ui';

export const ActionBar = ({ buttons, className }: ActionBarProps) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => () => {
    navigate(path);
  };

  return (
    <div className={`${styles['action-bar']} ${className || ''}`}>
      {buttons.map((button, index) => {
        const onClick = button.path
          ? handleNavigate(button.path)
          : button.onClick;

        return (
          <Button
            key={`${button.iconName}-${index}`}
            iconName={
              button.active
                ? button.iconNameActive || button.iconName
                : button.iconName
            }
            iconSize={button.size || 24}
            onClick={onClick}
            type={button.type || 'ghost'}
            aria-label={button.ariaLabel}
            className={button.className}
          />
        );
      })}
    </div>
  );
};
