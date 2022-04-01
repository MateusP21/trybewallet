import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencies } from '../actions/index';
import '../styles/Wallet.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { currencies } = this.props;
    return (
      <>
        <Header />
        <div className="wallet-container">
          <form>
            <label htmlFor="valor">
              Valor:
              {' '}

              <input data-testid="value-input" type="number" name="" id="valor" />
            </label>
            <label htmlFor="currencies">
              Moedas:
              {' '}
              <select data-testid="currency-input" name="" id="currencies">
                {
                  currencies && currencies.map((currency) => (
                    <option
                      key={ currency }
                      value={ currency }
                    >
                      {currency}
                    </option>))
                }
              </select>
            </label>
            <label htmlFor="pagamento">
              Metódo de Pagamento:
              {' '}
              <select data-testid="method-input" name="" id="pagamento">
                {['Dinheiro', 'Cartão de crédito', 'Cartão de débito']
                  .map((paymentMethod) => (
                    <option
                      key={ paymentMethod }
                    >
                      {paymentMethod}
                    </option>))}
              </select>
            </label>
            <label htmlFor="categorias">
              Categorias:
              {' '}
              <select data-testid="tag-input" name="" id="categorias">
                {['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde']
                  .map((category) => (
                    <option
                      key={ category }
                    >
                      {category}
                    </option>))}
              </select>
            </label>

            <label htmlFor="descricao">
              Descrição:
              {' '}
              <input data-testid="description-input" type="text" name="" id="descricao" />
            </label>
          </form>
        </div>
      </>);
  }
}

Wallet.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  getCurrencies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});
const mapDispatchToProps = (dispatch) => ({
  getCurrencies: (state) => dispatch(fetchCurrencies(state)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
