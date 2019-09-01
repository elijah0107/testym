import React from 'react';
import './addresses-list.scss';

const AddressesList = ({
  list,
  onRemove,
  onClick,
}) => {
  return (
    <div className='addresses-list'>
      {Boolean(Array.isArray(list)) && list.map((item, index) => {
        const {
          address,
        } = item || {};
        return (
          <span key={index}>{address}</span>
        );
      })}
    </div>
  );
};

export default AddressesList;
