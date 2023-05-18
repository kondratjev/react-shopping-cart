import { CartItemType } from '@/reducers/cart/cartSlice';
import { formatCurrency } from '@/utils/format';
import React from 'react';
import classes from './CartItem.module.css';

type Props = {
  item: CartItemType;
  addQuantity: (id: string) => void;
  subtractQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  changeQuantity: (id: string, quantity: number) => void;
};

const CartItem: React.FC<Props> = React.memo((props) => {
  const {
    item,
    addQuantity,
    subtractQuantity,
    removeFromCart,
    changeQuantity,
  } = props;
  const { name, quantity, price } = item;

  const formattedPrice = formatCurrency(price);

  return (
    <div className={classes['item']}>
      <span className={classes['item__title']} title={name}>
        {name}
      </span>
      <div className={classes['item__quantity']}>
        <button
          className={classes['item__quantity-button']}
          onClick={() => subtractQuantity(item.id)}
        >
          -
        </button>
        <input
          className={classes['item__quantity-input']}
          type="number"
          value={quantity}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const quantity = Number(e.target.value);
            changeQuantity(item.id, quantity);
          }}
        />
        <button
          className={classes['item__quantity-button']}
          onClick={() => addQuantity(item.id)}
        >
          +
        </button>
      </div>
      <span className={classes['item__price']} title={formattedPrice}>
        {formattedPrice}
      </span>
      <button
        className={classes['item__remove-button']}
        onClick={() => removeFromCart(item.id)}
      />
    </div>
  );
});

export default CartItem;
