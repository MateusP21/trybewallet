import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Table.css';

import { removeExpense } from '../actions';

class Table extends React.Component {
  render() {
    const { expenses, deleteExpense } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => {
              const {
                id,
                description,
                tag,
                currency,
                value,
                method,
                exchangeRates,
              } = expense;
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>
                    {Number(exchangeRates[currency].ask).toFixed(2)}

                  </td>

                  <td>{Number(value * exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button className="edit-button" type="button">Editar</button>
                    <button
                      onClick={ () => deleteExpense(id) }
                      data-testid="delete-btn"
                      className="remove-button"
                      type="button"
                    >
                      Excluir

                    </button>
                  </td>
                </tr>);
            })
          }
        </tbody>
      </table>);
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (state) => dispatch(removeExpense(state)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
