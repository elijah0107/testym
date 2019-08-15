import React, { Component } from 'react'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import { ymaps } from 'init/ymaps'
import SelectedPickupPointInfo from './selected-pickup-point-info'

/**
 * Компонент PickupInfoMap
 * @returns {ReactElement}
 */
class PickupInfoMap extends Component {
  /** @inheritDoc */
  constructor (props) {
    super(props)
    this.state = {
      isInfoPopupOpened: true,
    }
  }

  /** @inheritDoc */
  componentDidMount () {
    if (ymaps) {
      ymaps.ready(() => {
        this.initMap()
        this.renderMap(this.props)
      })
    }
  }

  /** @inheritDoc */
  componentWillUnmount () {
    if (this.suggestView) {
      this.suggestView.destroy()
    }
  }

  /**
   * Получить новые координаты со сдвигом по долготе.
   * @param {Array} coordinates Координаты точки.
   * @returns {Array} Новые координаты со сдвигом.
   */
  getCoordinatesWithOffset (coordinates) {
    const LONGITUDE_OFFSET = -0.0059
    const result = cloneDeep(coordinates)
    result[1] = result[1] + LONGITUDE_OFFSET
    return result
  }

  /**
   * Инициализация Я.карты
   */
  initMap = () => {
    const { isMobile, settlement } = this.props
    let mapControls = ['zoomControl']
    if (isMobile) {
      mapControls = mapControls.concat(['fullscreenControl', 'searchControl'])
    }
    const mapState = {
      controls: mapControls,
      center: [Number(settlement.latitude), Number(settlement.longitude)],
      zoom: 9,
    }
    const mapOptions = {
      maxZoom: 16,
    }
    this.yamap = new ymaps.Map('yamap', mapState, mapOptions)

    // инициализация поисковых подсказок яндекса
    if (!isMobile) {
      const settlementName = settlement.name
      this.suggestView = new ymaps.SuggestView('search_map', {
        provider: {
          suggest: request => ymaps.suggest(`${settlementName}, ${request}`),
        },
      })
    }
  }

  /**
   * Рендер Я.Карты.
   * @param {Object} [props=this.props] Свойства.
   */
  renderMap (props = this.props) {
    const {
      allPoints,
      sortedPoints,
      pickDelivery,
      selectedDelivery,
      isMobile,
      withBoundsUpdate = true,
    } = props || {}
    const fullscreenControl = this.yamap.controls.get('fullscreenControl')
    const searchControl = this.yamap.controls.get('searchControl')
    if (searchControl) {
      // скрытие яндекс меток устанавливаемых при поиске
      searchControl.options.set({ noPlacemark: true })
      searchControl.events.add('click', () => {
        this.handleClosePopup()
      })
    }

    this.yamap.geoObjects.removeAll()
    if (withBoundsUpdate) {
      const pickupPointCoordinates = sortedPoints.map(point => point.pickup_point.coordinates_array)
      Boolean(pickupPointCoordinates.length)
      && this.yamap.setBounds(ymaps.util.bounds.fromPoints(pickupPointCoordinates), {
        checkZoomRange: true,
      })
    }
    allPoints.map(point => {
      if (point.pickup_point && point.pickup_point.coordinates_array) {
        const placemark = new ymaps.Placemark(point.pickup_point.coordinates_array)
        const isSelected = selectedDelivery
          && selectedDelivery.id === point.id
          && selectedDelivery.pickup_point.id === get(point, 'pickup_point.id')
        placemark.events.add('click', () => {
          fullscreenControl && fullscreenControl.exitFullscreen()
          if (!isMobile) {
            this.setState({ isInfoPopupOpened: true })
          }
          pickDelivery(
            point,
            false,
            isMobile
          )
        })
        if (isSelected) {
          placemark.options.set('iconColor', 'red')
        }
        placemark.properties.set('id', point.id)
        this.yamap.geoObjects.add(placemark)
      }
    })
  }

  /**
   * При смене выбранной точки зумировать карту и делать точку красной.
   * @param {Object} newProps.selectedDelivery Объект с данными выбранного ПВЗ.
   * @param {Array} newProps.points Массив ПВЗ.
   * @param {boolean} newProps.isFullSizeModal полноэкранное окно.
   * @param {string} newProps.searchOnMapQuery запрос на поиск по Я.Карте.
   * @inheritDoc
   */
  componentWillReceiveProps (newProps) {
    const { selectedDelivery, searchOnMapQuery } = newProps
    if (this.yamap) {
      this.renderMap({ ...newProps, withBoundsUpdate: false })
      if (selectedDelivery && !isEqual(selectedDelivery, this.props.selectedDelivery)) {
        const coordinates = cloneDeep(selectedDelivery.pickup_point.coordinates_array || [])
        this.yamap.geoObjects.each(geoObject => {
          geoObject.options.set('visible', true)
          if (isEqual(geoObject.geometry.getCoordinates(), coordinates)) {
            geoObject.options.set('iconColor', 'red')
            this.yamap.setCenter(this.getCoordinatesWithOffset(coordinates), 14)
          } else {
            geoObject.options.set('iconColor', '#1E98FF')
          }
        })
      }
      if (!isEqual(searchOnMapQuery, this.props.searchOnMapQuery)) {
        ymaps.geocode(searchOnMapQuery)
          .then(response => {
            const firstResult = response.geoObjects.get(0)
            if (firstResult) {
              const coordinates = firstResult.geometry.getCoordinates()
              this.yamap.setCenter(coordinates, 14)
            }
          })
          .catch(() => false)
      }
    }
  }

  /** @inheritDoc */
  componentDidUpdate (prevProps) {
    if (!isEqual(this.props.isFullSizeModal, prevProps.isFullSizeModal)) {
      this.yamap.container.fitToViewport()
    }
  }

  /**
   * Обработчки закрытия попапа
   */
  handleClosePopup = () => {
    this.setState({ isInfoPopupOpened: false })
  }

  /** @inheritDoc */
  render () {
    const { selectedDelivery, isMobile, pickDelivery } = this.props
    return (
      <div className='map-column'>
        {selectedDelivery
        && !isMobile
        && this.state.isInfoPopupOpened
        && (
          <div className='b-popup map-info-popup'>
            <SelectedPickupPointInfo
              selectedDelivery={selectedDelivery}
              handleClick={() => pickDelivery(selectedDelivery, true, false)}
            />
            <div className='popup__close popup__close_symbol js-popup-close' onClick={this.handleClosePopup}>×</div>
          </div>
        )}
        <div id='yamap' className='yandex-map' />
      </div>
    )
  }
}

export default PickupInfoMap
