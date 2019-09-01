// import { createSelector } from 'reselect';
import get from 'lodash/get';

/**
 * Возвращает данные формы заказа.
 * @param {Object} state Состояние приложения.
 * @returns {Object} Данные формы заказа.
 */
export const selectInputValue = state => get(state, 'search.value', '');

/**
 * Возвращает данные формы заказа.
 * @param {Object} state Состояние приложения.
 * @returns {Object} Данные формы заказа.
 */
export const selectError = state => get(state, 'notice.error', '');

/**
 * Возвращает данные которые вернулись из апи.
 * @param {Object} state Состояние приложения.
 * @returns {Object} Данные формы заказа.
 */
export const selectSearchData = state => get(state, 'search.data', []);

/**
 * Возвращает данные которые вернулись из апи.
 * @param {Object} state Состояние приложения.
 * @returns {Object} Данные формы заказа.
 */
export const selectAddressesList = state => get(state, 'search.addressesList', []);
//
// /**
//  * Возвращает данные значения комментария в заказе.
//  * @param {Object} state Состояние приложения.
//  * @returns {string} Данные значения комментария в заказе.
//  */
// export const getCommentFieldValue = createSelector(
//   selectEmail,
//   comment => get(comment, 'value', '')
// );
