import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

const NUMBER_MIN = 3;

export default class Login extends Component {
  state = {
    name: '',
    buttonDisabled: true,
  };

  handlechange = ({ target }) => {
    const { value } = target;
    console.log(value.length);
    if (value.length >= NUMBER_MIN) {
      this.setState({
        buttonDisabled: false,
      });
    }
    this.setState({
      name: value,
    });
  };

  // handleClick = () => {

  // };

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
            placeholder="Nome"
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ buttonDisabled }
        >
          Entrar

        </button>
      </div>
    );
  }
}
