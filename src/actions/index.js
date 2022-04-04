// Coloque aqui suas actions
const actionLogin = (email) => ({ type: 'LOGIN', email });
const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

const requestCurrencies = () => ({
  type: 'REQUEST_CURRENCIES',
});

const setEditing = (payload) => ({
  type: 'SET_EDITING',
  payload,
});
const editingExpense = (payload) => ({
  type: 'EDIT_EXPENSE',
  payload,
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

const editExpense = (state) => (dispatch, getState) => {
  const { expenses, selectedExpense } = getState().wallet;
  const findExpenseIndex = expenses.findIndex(
    (expense) => expense.id === selectedExpense.id,
  );
  const newExpenses = [...expenses];
  newExpenses[findExpenseIndex] = { ...selectedExpense, ...state };
  dispatch(editingExpense(newExpenses));
};

module.exports = {
  actionLogin,
  requestCurrencies,
  fetchCurrencies,
  saveExpenses,
  removeExpense,
  setEditing,
  editingExpense,
  editExpense,
};
