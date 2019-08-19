import React from 'react';
import Autocomplete from 'react-autocomplete';

const Input = ({
  value = '',
  items = [],
  onChange,
  isFetching = false,
}) => {
  return (
    <Autocomplete
      getItemValue={(item) => item.label}
      items={items}
      renderItem={(item, isHighlighted) => (
        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
          {item.label}
        </div>
      )}
      renderMenu={renderSuggestionsPopup(items, value, isFetching)}
      value={value}
      onChange={onChange}
      onSelect={(val) => value = val}
    />
  );
};

/**
 * Возвращает элемент попапа подсказок.
 * @param {ReactElement[]} items Массив элементов подсказок.
 * @param {string} value Введённое значение дял поиска.
 * @param {boolean} isFetching Идет ли в данный момент загрузка.
 * @returns {ReactElement} Элемент попапа подсказок.
 */
export const renderSuggestionsPopup = (items, value, isFetching) => {
  // @todo использовать <Popup />
  return (
    <div className='b-popup'>
      {Boolean(!items.length) && (
        <span className='dadata-popup-tooltip'>
          {/*{Boolean(isFetching) && (*/}
          {/*  <Preloader size={SIZES.small} />*/}
          {/*)}*/}
          {Boolean(!isFetching && value) && 'Неизвестный адрес'}
        </span>
      )}
      {items}
    </div>
  );
};

export default Input;
