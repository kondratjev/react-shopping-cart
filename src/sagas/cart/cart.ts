import { cartSelector } from '@/reducers/cart/cartSelectors';
import {
  CartItemType,
  CartState,
  addToCart,
  addToCartError,
  addToCartSuccess,
  fetchCart,
  fetchCartError,
  fetchCartSuccess,
} from '@/reducers/cart/cartSlice';
import { fetchCartAPI } from '@/services/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';

function isCart(cart: unknown): cart is CartItemType[] {
  if (!Array.isArray(cart)) {
    return false;
  }

  return cart.every((item) => {
    return (
      'id' in item && 'name' in item && 'quantity' in item && 'price' in item
    );
  });
}

export function* fetchCartSaga() {
  try {
    const cart: unknown = yield call(fetchCartAPI);
    yield delay(1000);
    if (isCart(cart)) {
      yield put(fetchCartSuccess(cart));
    } else {
      yield put(fetchCartError('Data is corrupted. TypeGuard Error!'));
    }
  } catch (e) {
    const error = (e as Error).message;
    yield put(fetchCartError(error));
  }
}

export function* fetchCartWatcherSaga() {
  yield takeLatest(fetchCart.type, fetchCartSaga);
}

export function* addToCartSaga(action: PayloadAction<CartItemType>) {
  try {
    const item = action.payload;
    yield delay(1000);
    const cart: CartState = yield select(cartSelector);
    yield put(addToCartSuccess(cart.items.concat(item)));
  } catch (e) {
    const error = (e as Error).message;
    yield put(addToCartError(error));
  }
}

export function* addToCartWatcherSaga() {
  yield takeLatest(addToCart.type, addToCartSaga);
}
