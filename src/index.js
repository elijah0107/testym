import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Connector';
import * as serviceWorker from './serviceWorker';
import { createStore } from './service/store';
import { createWatcher } from './sagas/_index';
import { createAPI } from './service/api';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import reducer from './reducers/_index';

document.addEventListener('DOMContentLoaded', () => {
  const history = createBrowserHistory();
  const store = createStore(reducer, createWatcher({
    api: createAPI(),
    history,
  }));
  ReactDOM.render(
    (
      <Provider store={store}>
        <App />
      </Provider>
    ),
    document.getElementById('root'),
  );
  serviceWorker.unregister();
});
