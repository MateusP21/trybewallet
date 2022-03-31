import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencies } from '../actions/index';

class Wallet extends React.Component {
  componentDidMount() {
    const { currencies } = this.props;
    currencies();
  }

  render() {
    return (
      <>
        <Header />
        <div>
          <h1>Wallet</h1>
        </div>
      </>);
  }
}

Wallet.propTypes = {
  currencies: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  currencies: (state) => dispatch(fetchCurrencies(state)),
});
export default connect(null, mapDispatchToProps)(Wallet);
