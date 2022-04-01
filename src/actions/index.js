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

const saveExpensesAction = (payload) => ({
  type: 'SAVE_EXPENSES',
  payload,
});

const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  const currencies = await (await fetch(ENDPOINT)).json();
  delete currencies.USDT;
  dispatch(responseCurrencies(currencies));
};

const saveExpenses = (state) => async (dispatch, getState) => {
  const currencies = await (await fetch(ENDPOINT)).json();
  const expensesLength = getState().wallet.expenses.length;
  const myExpenses = { ...state, id: expensesLength, exchangeRates: currencies };
  dispatch(saveExpensesAction(myExpenses));
};

module.exports = {
  actionLogin, requestCurrencies, fetchCurrencies, saveExpenses,
};

// const expenses =  [{
//   "id": 0,
//   "value": "3",
//   "description": "Hot Dog",
//   "currency": "USD",
//   "method": "Dinheiro",
//   "tag": "Alimentação",
//   "exchangeRates": {
//     "USD": {
//       "code": "USD",
//       "name": "Dólar Comercial",
//       "ask": "5.6208",

//     },
//     "CAD": {
//       "code": "CAD",
//       "name": "Dólar Canadense",
//       "ask": "4.2313",
//       ...
//     },
//     "EUR": {
//       "code": "EUR",
//       "name": "Euro",
//       "ask": "6.6112",
//       ...
//     },
//     "GBP": {
//       "code": "GBP",
//       "name": "Libra Esterlina",
//       "ask": "7.2498",
//       ...
//     },
//     "ARS": {
//       "code": "ARS",
//       "name": "Peso Argentino",
//       "ask": "0.0729",
//       ...
//     },
//     "BTC": {
//       "code": "BTC",
//       "name": "Bitcoin",
//       "ask": "60299",
//       ...
//     },
//     "LTC": {
//       "code": "LTC",
//       "name": "Litecoin",
//       "ask": "261.69",
//       ...
//     },
//     "JPY": {
//       "code": "JPY",
//       "name": "Iene Japonês",
//       "ask": "0.05301",
//       ...
//     },
//     "CHF": {
//       "code": "CHF",
//       "name": "Franco Suíço",
//       "ask": "6.1297",
//       ...
//     },
//     "AUD": {
//       "code": "AUD",
//       "name": "Dólar Australiano",
//       "ask": "4.0124",
//       ...
//     },
//     "CNY": {
//       "code": "CNY",
//       "name": "Yuan Chinês",
//       "ask": "0.8278",
//       ...
//     },
//     "ILS": {
//       "code": "ILS",
//       "name": "Novo Shekel Israelense",
//       "ask": "1.6514",
//       ...
//     },
//     "ETH": {
//       "code": "ETH",
//       "name": "Ethereum",
//       "ask": "5184",
//       ...
//     },
//     "XRP": {
//       "code": "XRP",
//       "name": "Ripple",
//       "ask": "1.4",
//       ...
//     }
//   }
// }]
