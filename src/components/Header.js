import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Header.css';

class Header extends React.Component {
  render() {
    const { userEmail, expenses } = this.props;

    return (
      <header className="header">
        <h1>Trybe Wallet</h1>
        <div className="header-content">
          <p>
            Email:
            <span data-testid="email-field">
              {
                !userEmail ? 'user@email.com' : userEmail
              }

            </span>
          </p>
          <p>
            Total:
            <span data-testid="total-field">
              {

                expenses.length > 0 ? expenses.reduce(
                  (accumulator, current) => {
                    const { exchangeRates, currency, value } = current;
                    const total = accumulator + (Number(value)
                    * exchangeRates[currency].ask);
                    return total;
                  }, 0,
                ).toFixed(2) : '0.00'
              }

            </span>
          </p>

          <p>
            Moeda:
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </div>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default connect(mapStateToProps)(Header);
