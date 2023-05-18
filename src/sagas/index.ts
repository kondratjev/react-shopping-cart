import { addToCartWatcherSaga, fetchCartWatcherSaga } from '@/sagas/cart/cart';
import { fork } from 'redux-saga/effects';

export default function* rootSaga() {
  yield fork(fetchCartWatcherSaga);
  yield fork(addToCartWatcherSaga);
}
