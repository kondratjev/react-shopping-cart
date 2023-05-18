import React from 'react';
import classes from './Layout.module.css';

type Props = { children: React.ReactNode; renderForm: () => React.ReactNode };

const Layout: React.FC<Props> = (props) => {
  const { children, renderForm } = props;

  return (
    <div className={classes['container']}>
      <div className={classes['grid']}>
        <div className={classes['cart']}>
          <h1 className={classes['cart__title']}>Shopping Cart</h1>
          {children}
        </div>
        <div className={classes['form']}>{renderForm()}</div>
      </div>
    </div>
  );
};

export default Layout;
