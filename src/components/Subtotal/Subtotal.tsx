import { formatCurrency } from '@/utils/format';
import React from 'react';
import classes from './Subtotal.module.css';

type Props = { subtotal: number };

const Subtotal: React.FC<Props> = (props) => {
  const subtotal = formatCurrency(props.subtotal);

  return (
    <p className={classes['subtotal']}>
      <span className={classes['subtotal__label']}>Subtotal:</span>{' '}
      <span className={classes['subtotal__value']} title={subtotal}>
        {subtotal}
      </span>
    </p>
  );
};

export default Subtotal;
