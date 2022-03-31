// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: false,

};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_CURRENCIES':
    return { ...state, isLoading: true };
  case 'RESPONSE_CURRENCIES':
    return { ...state,
      isLoading: false,
      currencies: action.payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
