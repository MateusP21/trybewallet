// Coloque aqui suas actions
const actionLogin = (email) => ({ type: 'LOGIN', email });
const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

const requestCurrencies = () => ({
  type: 'REQUEST_CURRENCIES',
});

const responseCurrencies = (payload) => ({
  type: 'RESPONSE_CURRENCIES',
  payload,
});

const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  const currencies = await (await fetch(ENDPOINT)).json();
  delete currencies.USDT;

  dispatch(responseCurrencies(Object.keys(currencies)));
};

module.exports = {
  actionLogin, requestCurrencies, fetchCurrencies,
};
