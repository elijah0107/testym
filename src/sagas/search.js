import { call, put } from 'redux-saga/effects';
import { Creators as SearchCreators } from '../reducers/search';

/**
 * Делает запрос на получение списка адресов доставки в API и обрабатывает ответ.
 * @generator
 * @param {Object} options Объект с опциями.
 * @param {Object} options.api Объект с API.
 */
export function* request ({ api }, { value }) {
  if (value) {
    const data = yield call(window.ymaps.suggest, value)
    if (data) {
      const result = yield call(processSearchData, data)
      yield put(SearchCreators.success(result));
    } else {
      yield put(SearchCreators.failure());
    }
  }
}

/**
 * Делает запрос на получение списка адресов доставки в API и обрабатывает ответ.
 * @generator
 * @param {Object} options Объект с опциями.
 * @param {Object} options.api Объект с API.
 */
export function* selectAddress ({ address }) {
  console.log(address)
  if (address) {
    const response = yield call(window.ymaps.geocode, address, { json: true })
    const { GeoObjectCollection } = response || {}
    const { metaDataProperty } = GeoObjectCollection || {}
    const { GeocoderResponseMetaData } = metaDataProperty || {}
    const { Point } = GeocoderResponseMetaData
    const { coordinates } = Point || {}
    yield put(SearchCreators.setAddress(address, coordinates));
  }
}

export const processSearchData = (data) => {
  return Array.isArray(data) && data.map((item) => {
    const {
      displayName,
    } = item || {};
    return {
      address: displayName,
    };
  });
};

export const processGeoData = (data) => {
  return Array.isArray(data) && data.map((item) => {
    const {
      displayName,
    } = item || {};
    return {
      address: displayName,
    };
  });
};
