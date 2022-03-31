import React from 'react';
import { connect } from 'react-redux';

import '../styles/Header.css';

class Header extends React.Component {
  render() {
    const { userEmail } = this.props;

    return (
      <header className="header">
        <h1>TrybeWallet</h1>
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
            <span data-testid="total-field">0</span>
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
});

export default connect(mapStateToProps)(Header);
