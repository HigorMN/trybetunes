import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Carregando from '../components/Carregando';
import { createUser } from '../services/userAPI';
import logoDark from '../images/logoDark.png';

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
    const habilitarBtn = value.length < NUMBER_MIN;

    this.setState({
      name: value,
      buttonDisabled: habilitarBtn,
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
            <>
              <img src={ logoDark } alt="Logo trybe tunes" />
              <form className="container-form">
                <div className="login-name">
                  <label htmlFor="login">
                    <input
                      type="text"
                      value={ name }
                      name="login"
                      id="login"
                      data-testid="login-name-input"
                      onChange={ this.handlechange }
                      placeholder="Nome"
                      className="input-name"
                    />
                  </label>
                </div>
                <div className="container-button">
                  <button
                    type="button"
                    data-testid="login-submit-button"
                    disabled={ buttonDisabled }
                    onClick={ this.handleClick }
                    className="button-login"
                  >
                    Entrar
                  </button>
                </div>
              </form>
            </>
          )}
        { login && <Redirect to="/search" /> }
      </div>
    );
  }
}
