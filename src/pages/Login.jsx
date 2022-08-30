import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    name: '',
    buttonDisabled: true,
  };

  handlechange = ({ taget }) => {

  };

  render() {
    const { name, buttonDisabled } = this.state;
    return (
      <div data-testid="page-login">
        <label htmlFor="login">
          <input
            type="text"
            value={ name }
            name="login"
            id="login"
            data-testid="login-name-input"
            onChange={ this.handlechange }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          disabled
        >
          Entrar

        </button>
      </div>
    );
  }
}
