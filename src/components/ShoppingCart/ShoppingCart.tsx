import { CartItemType } from '@/reducers/cart/cartSlice';
import React from 'react';
import CartItem from '../CartItem';
import Loader from '../Loader';
import Subtotal from '../Subtotal';
import classes from './ShoppingCart.module.css';

type Props = {
  items: CartItemType[];
  isLoading: boolean;
  error: string;
  subtotal: number;
  addQuantity: (id: string) => void;
  subtractQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  changeQuantity: (id: string, quantity: number) => void;
};

const ShoppingCart: React.FC<Props> = (props) => {
  const {
    isLoading,
    items,
    error,
    subtotal,
    addQuantity,
    subtractQuantity,
    removeFromCart,
    changeQuantity,
  } = props;

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className={classes['cart__error']}>Error: {error}</p>;
  }

  if (items.length === 0) {
    return <p className={classes['cart__empty']}>Cart Is Empty</p>;
  }

  return (
    <>
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addQuantity={addQuantity}
          subtractQuantity={subtractQuantity}
          changeQuantity={changeQuantity}
          removeFromCart={removeFromCart}
        />
      ))}
      <Subtotal subtotal={subtotal} />
    </>
  );
};

export default ShoppingCart;
