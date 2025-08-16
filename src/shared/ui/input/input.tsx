import {InputProps} from './type'

export const Input = (props: InputProps) => (
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
);