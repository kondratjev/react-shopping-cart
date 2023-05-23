import React from 'react';
import classes from './InputField.module.css';
import clsx from 'clsx';

type Props = JSX.IntrinsicElements['input'] & {
  error: string | undefined;
};

const InputField = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { title, error, className, ...rest } = props;

  return (
    <div className={clsx(classes['container'], className)}>
      <div
        className={clsx(classes['wrapper'], {
          [classes['wrapper__error']]: error,
        })}
      >
        <p className={classes['title']}>{title}</p>
        <input {...rest} ref={ref} className={classes['input']} />
      </div>
      {error && <p className={classes['error']}>{error}</p>}
    </div>
  );
});

export default InputField;
