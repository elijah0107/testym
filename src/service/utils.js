import isSymbol from 'lodash/isSymbol';

/**
 * Возвращает склонённое существительное.
 * @param {number} count Количество для склонения.
 * @param {Array} declinations Массив существительных.
 * @return {string} Склонённое существительное.
 */
export function getDeclination (count, declinations) {
  declinations = Array.isArray(declinations) ? declinations : [];
  const [one = 'шт.', two = 'шт.', many = 'шт.'] = declinations;
  count = Math.abs(count);
  count %= 100;
  if (count >= 5 && count <= 20) {
    return many;
  }
  count %= 10;
  if (count === 1) {
    return one;
  }
  if (count >= 2 && count <= 4) {
    return two;
  }
  return many;
}

/**
 * Форматирует переданное число.
 * @param {number} value Число.
 * @return {[string, string]} Массив с целой и дробной отформатированными частями.
 */
export function formatNumber (value) {
  const number = isNumeric(value) ? Number(value) : 0;
  return (Math.floor(number * 1000) / 1000).toFixed(2).split('.');
}

/**
 * Возвращает true если переданное значение является числовым или приводимым к числу.
 * @param {*} value Проверяемое значение.
 * @return {boolean} Является ли значение числовым или приводимым к числу.
 */
export function isNumeric (value) {
  return !isSymbol(value) && !isNaN(parseFloat(value)) && isFinite(value);
}
