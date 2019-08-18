import { createStore as createReduxStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import createSaga from 'redux-saga';

/**
 * Возвращает новое хранилище приложения.
 * @param {Function} reducer Редьюсер.
 * @param {Generator} watcher Сага-наблюдатель.
 * @return {Object} Новое хранилище.
 */
export function createStore (reducer, watcher) {
  const sagaMiddleware = createSaga();
  const store = createReduxStore(
    reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(watcher);
  return store;
}
