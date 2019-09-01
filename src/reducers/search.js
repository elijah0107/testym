import { createReducer, createActions } from 'reduxsauce';
import { DATA_STATES_TYPES } from '../service/constants';
import * as commonReducers from './common-reducers';

export const { Types, Creators } = createActions(
  {
    success: ['data'],
    failure: ['error'],
    request: [],
    setQuery: ['value'],
    selectAddress: ['address'],
    setAddress: ['address', 'coordinates'],
  },
  { prefix: 'search/' }
);

/**
 * Возвращает начальное состояние.
 * @return {Object} Начальное состояние.
 */
export function getInitialState () {
  return {
    state: DATA_STATES_TYPES.initial,
    data: {},
    value: '',
    addressesList: [],
  };
}

/**
 * Записывает email.
 * @param {Object} state Состояние приложения.
 * @param {string} value Значение переменной.
 * @returns {Object} Объект с записанными данными
 */
export const setQuery = (state, { value = '' }) => {
  return { ...state, value };
};

/**
 * Записывает email.
 * @param {Object} state Состояние приложения.
 * @param {string} value Значение переменной.
 * @returns {Object} Объект с записанными данными
 */
export const setAddress = (state, { address = '', coordinates = [] }) => {
  return { ...state, addressesList: [
    ...state.addressesList,
    { address, coordinates },
  ] };
};

export default createReducer(getInitialState(), {
  [Types.SUCCESS]: commonReducers.success,
  [Types.FAILURE]: commonReducers.failure,
  [Types.REQUEST]: commonReducers.request,
  [Types.SET_QUERY]: setQuery,
  [Types.SET_ADDRESS]: setAddress,
});
