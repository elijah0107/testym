import React from 'react';
import './App.css';
import Input from '../input';

const App = ({
  onChangeInput,
  inputValue,
  searchData,
}) => {
  const items = Array.isArray(searchData) ? searchData.map(item => item.address) : [];
  return (
    <div className='App'>
      <Input
        onChange={onChangeInput}
        value={inputValue}
        items={items}
      />
    </div>
  );
};

export default App;
