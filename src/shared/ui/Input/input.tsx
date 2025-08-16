import { InputProps } from './type';
import clsx from 'clsx';

export const Input = (props: InputProps) => {
  const iconClasses = clsx('input__icon', {
    'input__icon-left': props.iconPosition === 'left',
    'input__icon-right': props.iconPosition === 'right'
  });

  return (
    <div className='input__wrapper'>
      <div className='input__inner'>
        <input
          type={props.type || 'text'}
          pattern={props.pattern}
          placeholder={props.placeholder}
          min={props.min}
          max={props.max}
          name={props.name}
          required={props.required}
          value={props.value}
          onChange={props.onChange}
        />
        {props.icon && (
          <div className={clsx('input__icon-container', iconClasses)}>
            <img
              src={props.icon}
              alt='icon'
              className='input__icon'
            />
          </div>
        )}
      </div>
    </div>
  );
};
