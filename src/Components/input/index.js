import React from 'react';
import Autocomplete from 'react-autocomplete';

const Input = ({
  value = '',
  onChange = () => {},
  isFetching = false,
  items,
  onSelect,
}) => {
  return (
    <Autocomplete
      getItemValue={(item) => item.address}
      items={Array.isArray(items) ? items.map(item => item) : []}
      renderItem={ (item, active) => <div style={{ background: active ? 'lightgray' : 'white' }}>{ item.address }</div> }
      value={value}
      onChange={onChange}
      onSelect={(address) => onSelect(address)}
    />
  );
};

export default Input;
