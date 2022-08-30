import React, { Component } from 'react';

export default class Search extends Component {
  state = {
    artista: '',
    buttonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { value } = target;
    const habilitarBtn = value.length < 2;
    console.log(habilitarBtn);
    this.setState({
      artista: value,
      buttonDisabled: habilitarBtn,
    });
  };

  render() {
    const { artista, buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <form>
          <input
            type="text"
            value={ artista }
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}
