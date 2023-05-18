import React from 'react';
import classes from './InputField.module.css';

type Props = JSX.IntrinsicElements['input'] & {
  error: string | undefined;
};

const InputField = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { title, error, ...rest } = props;

  return (
    <div className={classes['container']}>
      <div className={classes['wrapper']}>
        <p className={classes['title']}>{title}</p>
        <input {...rest} ref={ref} className={classes['input']} />
      </div>
      {error && <p className={classes['error']}>{error}</p>}
    </div>
  );
});

export default InputField;
