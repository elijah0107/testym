import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const YandexMap = ({
  addressesList,
}) => {
  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 5,
  }
  return (
    <YMaps>
      <div className='map'>
        <Map defaultState={defaultState} width={600} height={600}>
          {addressesList.map((address, index) => {
            const { coordinates } = address || {}
            return <Placemark geometry={coordinates} key={index} />;
          })}
        </Map>
      </div>
    </YMaps>
  );
};

export default YandexMap;
