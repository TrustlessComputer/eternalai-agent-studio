import cx from 'clsx';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import './Button.scss';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const Button: FC<IButtonProps> = ({ onClick, disabled, className, children, ...rest }) => (
  <button
    type="button"
    className={cx('button', className, { 'button__disabled': disabled })}
    onClick={onClick}
    disabled={disabled}
    {...rest}
  >
    {children}
  </button>
);
