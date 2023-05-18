import clsx from 'clsx';
import React from 'react';
import classes from './Button.module.css';

type Props = JSX.IntrinsicElements['button'];

const Button: React.FC<Props> = (props) => {
  const { className, children, ...rest } = props;
  return (
    <button className={clsx(classes['button'], className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
