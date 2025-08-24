import React from 'react';
import styles from './ActionBar.module.css';
import { ActionBarProps, ButtonConfig } from './types';
import { Button } from '../Button';

export const ActionBar: React.FC<ActionBarProps> = ({
  buttons: buttonsProps
}) => {
  return (
    <div className={styles['action-bar']}>
      {buttonsProps?.map((button: ButtonConfig, index: number) => (
        <Button
          key={`${button.iconName}-${index}`}
          iconName={button.active ? button.iconNameActive : button.iconName}
          iconSize={button.size}
          onClick={button.onClick}
          type={button.type || 'ghost'}
        />
      ))}
    </div>
  );
};
