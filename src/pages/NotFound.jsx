import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logoDark from '../images/logoDark.png';

export default class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found" className="not-found">
        <img
          src={ logoDark }
          alt="Logo trybe tunes"
          className="image-login"
        />
        <div>
          <h1>Ops!</h1>
          <p>
            A página que você
            está procurando
            não foi encontrada.
            {' '}
            <Link to="/search">voltar para pagina</Link>
          </p>

        </div>
      </div>
    );
  }
}
