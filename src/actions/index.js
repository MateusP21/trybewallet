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

const removeExpense = (payload) => ({
  type: 'REMOVE_EXPENSE',
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
  actionLogin, requestCurrencies, fetchCurrencies, saveExpenses, removeExpense,
};
