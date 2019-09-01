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
    postDaData: (payload, type) => {
      const API_KEY = 'b6804756d81c2235d9ca9ccac2e9b4a376859d98';
      return api.post(`https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/${type || 'address'}`,
        { count: 5, ...payload },
        { headers: { 'Authorization': 'Token ' + API_KEY }, withCredentials: false });
    },
  };
};
