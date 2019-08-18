import React from 'react';
import Autocomplete from 'react-autocomplete';

const Input = ({
  value = '',
  items = [],
  onChange,
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
      value={value}
      onChange={onChange}
      onSelect={(val) => value = val}
    />
  );
};

export default Input;
