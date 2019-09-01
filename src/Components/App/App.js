import React from 'react';
import './App.scss';
import Input from '../input';
import AddressesList from '../addresses-list';
import YandexMap from '../yandex-map';

const App = ({
  onChangeInput,
  inputValue,
  searchData,
  setAddress,
  addressesList,
}) => {
  return (
    <div className='container'>
      <div className=''>
        <Input
          onChange={onChangeInput}
          value={inputValue}
          items={searchData}
          onSelect={setAddress}
        />
        <AddressesList
          list={addressesList}
        />
      </div>
      <YandexMap
        addressesList={addressesList}
      />
    </div>
  );
};

export default App;
