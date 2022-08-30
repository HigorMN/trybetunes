import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Carregando from '../components/Carregando';
import { createUser } from '../services/userAPI';

const NUMBER_MIN = 3;

export default class Login extends Component {
  state = {
    name: '',
    buttonDisabled: true,
    login: false,
    loading: false,
  };

  handlechange = ({ target }) => {
    const { value } = target;
    if (value.length >= NUMBER_MIN) {
      this.setState({
        buttonDisabled: false,
      });
    }
    this.setState({
      name: value,
    });
  };

  handleClick = async () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name });
    this.setState({
      login: true,
      loading: false,
    });
  };

  render() {
    const { name, buttonDisabled, login, loading } = this.state;
    return (
      <div data-testid="page-login">
        {loading
          ? <Carregando />
          : (
            <div>
              <h1>Login</h1>
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
                onClick={ this.handleClick }
              >
                Entrar

              </button>
            </div>)}
        { login && <Redirect to="/search" /> }
      </div>
    );
  }
}
