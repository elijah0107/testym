import { DATA_STATES_TYPES } from '../service/constants';

/**
 * Меняет состояние получения данных на "запрашивается".
 * @param {Object} state Текущее состояние.
 * @return {Object} Новое состояние.
 */
export const request = state => {
  return { ...state, state: DATA_STATES_TYPES.fetching };
};

/**
 * Меняет состояние получения данных на "успешный ответ".
 * @param {Object} state Текущее состояние.
 * @param {Object} data Данные для сохранение в состояние.
 * @return {Object} Новое состояние.
 */
export const success = (state, { data }) => {
  return { ...state, state: DATA_STATES_TYPES.success, data, error: undefined };
};

/**
 * Меняет состояние получения данных на "ответ с ошибкой".
 * @param {Object} state Текущее состояние.
 * @return {Object} Новое состояние.
 */
export const failure = (state, { error }) => {
  return { ...state, state: DATA_STATES_TYPES.error, error };
};
