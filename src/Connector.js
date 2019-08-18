import { connect } from 'react-redux';
import App from './Components/App/App';
import { Creators as SearchCreators } from './reducers/search';
import {
  selectInputValue,
  selectError,
  selectSearchData,
} from './selectors';

/**
 * Подключение свойств Redux в свойства компонента.
 * @param {Object} state Состояние приложения из Redux-хранилища.
 * @return {Object} Свойства компонента.
 */
const mapStateToProps = state => {
  return {
    inputValue: selectInputValue(state),
    error: selectError(state),
    searchData: selectSearchData(state),
  };
};

/**
 * Подключение событий к компоненту.
 * @param {Function} dispatch Метод для вызова действия.
 * @return {Object} Свойства компонента.
 */
const mapDispatchToProps = dispatch => ({
  onChangeInput: event => event && event.target && dispatch(SearchCreators.setQuery(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
