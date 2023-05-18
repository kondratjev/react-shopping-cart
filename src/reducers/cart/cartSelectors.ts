import { RootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';

export const cartSelector = (state: RootState) => state.cart;

export const subtotalSelector = createSelector(cartSelector, (cart) => {
  return cart.items.reduce((total, item) => {
    const { price, quantity } = item;
    return total + price * quantity;
  }, 0);
});
