import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ListBox, ListBoxItem, Map, YMaps} from 'react-yandex-maps';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <YMaps>
        <div>
          <Map defaultState={{  center: [55.75, 37.57], zoom: 16,  }}>
            <ListBox/>
            <ListBoxItem/>
          </Map>
        </div>
      </YMaps>
    </div>
  );
}

export default App;
