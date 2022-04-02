import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencies, saveExpenses } from '../actions/index';
import '../styles/Wallet.css';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      method: '',
      currency: 'USD',
      tag: '',
      description: '',
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  resetState = () => {
    this.setState({
      value: 0,
      method: '',
      currency: 'USD',
      tag: '',
      description: '',
    });
  }

  handleSubmit = () => {
    const { saveMyExpenses } = this.props;
    saveMyExpenses(this.state);
    this.resetState();
  }

  render() {
    const { currencies } = this.props;
    const { tag, value, currency, description, method } = this.state;
    return (
      <>
        <Header />
        <div className="wallet-container">
          <form>
            <label htmlFor="priceValue">
              <h4>Valor:</h4>
              {' '}
              <input
                value={ value }
                onChange={ this.handleChange }
                data-testid="value-input"
                type="number"
                name="value"
                id="priceValue"
              />
            </label>
            <label htmlFor="currencies">
              <h4> Moedas:</h4>
              {' '}
              <select
                value={ currency }
                onChange={ this.handleChange }
                data-testid="currency-input"
                name="currency"
                id="currencies"
              >
                {
                  currencies && currencies.map((currencyValue) => (
                    <option
                      key={ currencyValue }
                      value={ currencyValue }
                    >
                      {currencyValue}
                    </option>))
                }
              </select>
            </label>
            <label htmlFor="payment">
              <h4>Metódo de Pagamento:</h4>

              {' '}
              <select
                value={ method }
                onChange={ this.handleChange }
                data-testid="method-input"
                name="method"
                id="payment"
              >
                {['Dinheiro', 'Cartão de crédito', 'Cartão de débito']
                  .map((paymentMethod) => (
                    <option
                      key={ paymentMethod }
                    >
                      {paymentMethod}
                    </option>))}
              </select>
            </label>
            <label htmlFor="category">
              <h4> Categorias:</h4>

              {' '}
              <select
                value={ tag }
                onChange={ this.handleChange }
                data-testid="tag-input"
                name="tag"
                id="category"
              >
                {['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde']
                  .map((category) => (
                    <option
                      key={ category }
                    >
                      {category}
                    </option>))}
              </select>
            </label>

            <label htmlFor="description">
              <h4> Descrição:</h4>

              {' '}
              <input
                value={ description }
                onChange={ this.handleChange }
                data-testid="description-input"
                type="text"
                name="description"
                id="description"
              />
            </label>
            <button onClick={ this.handleSubmit } type="button">Adicionar despesa</button>
          </form>
          <Table />
        </div>
      </>);
  }
}

Wallet.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  saveMyExpenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});
const mapDispatchToProps = (dispatch) => ({
  getCurrencies: (state) => dispatch(fetchCurrencies(state)),
  saveMyExpenses: (state) => dispatch(saveExpenses(state)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
