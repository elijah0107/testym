import { call, put, select } from 'redux-saga/effects';
import { Creators as SearchCreators } from '../reducers/search';
import { selectInputValue } from '../selectors';

/**
 * Делает запрос на получение списка адресов доставки в API и обрабатывает ответ.
 * @generator
 * @param {Object} options Объект с опциями.
 * @param {Object} options.api Объект с API.
 */
export function* request ({ api }) {
  const query = yield select(selectInputValue);
  // const response = yield call(api.getSuggest, { query });
  const data = yield call(window.ymaps.suggest, query)
  if (data) {
    const result = yield call(processData, data)
    yield put(SearchCreators.success(result));
  } else {
    yield put(SearchCreators.failure());
  }
}

export const processData = (data) => {
  return data.map((item) => {
    const {
      displayName,
      hl,
    } = item || {};
    return {
      address: displayName,
      coordinates: hl,
    };
  });
};
