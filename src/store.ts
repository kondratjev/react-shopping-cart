import rootReducer from '@/reducers';
import rootSaga from '@/sagas';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware);
  },
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
