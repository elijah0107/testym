/**
 * Состояния загружаемых данных.
 * @type {Object}
 */
export const DATA_STATES_TYPES = {
  success: 'success',
  error: 'error',
  fetching: 'fetching',
  initial: 'initial',
};

/**
 * Выполняется ли код в production окружении.
 */
export const isProduction = process.env.NODE_ENV !== 'development';

/**
 * Путь до сайта sima-land.ru
 * @type {string}
 */
export const SIMALAND_URI = isProduction ? 'www.sima-land.ru' : 'frontend-sl.local:8443';
