import PropTypes from 'prop-types';
import React from 'react';
import '../styles/Login.css';
import { connect } from 'react-redux';
import { actionLogin } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };
  }

  verifyFields = () => {
    const { email, password } = this.state;
    const minLength = 6;
    const mailRgx = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

    if (mailRgx.test(email) && password.length >= minLength) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => this.verifyFields(),
    );
  };

  handleSubmit = () => {
    const { email } = this.state;
    const { login, history } = this.props;
    login(email);

    history.push('/carteira');
  };

  render() {
    const { buttonDisabled, email, password } = this.state;
    return (
      <div className="login">
        <h1>Trybe Wallet</h1>
        <div className="input-container">

          <input
            type="text"
            name="email"
            value={ email }
            placeholder="Email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            value={ password }
            name="password"
            placeholder="Senha"
            data-testid="password-input"
            onChange={ this.handleChange }
          />

        </div>

        <button
          className="login-button"
          disabled={ buttonDisabled }
          type="button"
          onClick={ () => this.handleSubmit() }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (state) => dispatch(actionLogin(state)),
});
export default connect(null, mapDispatchToProps)(Login);
