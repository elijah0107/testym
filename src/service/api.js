import apisauce from 'apisauce';

/**
 * Возвращает новый экземпляр API.
 * @return {Object} Экземпляр API.
 */
export const createAPI = () => {
  const api = apisauce.create({
    timeout: 20000,
    withCredentials: true,
  });

  return {
    getSuggest: ({ query }) => {
      return api.get(`https://geocode-maps.yandex.ru/1.x/?csp=true&format=jsonp&geocode=${query}`);
    },
  };
};
