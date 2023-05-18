import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './containers/App/App.tsx';
import './index.css';
import { store } from './store.ts';

const container = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
