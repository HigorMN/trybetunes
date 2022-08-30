import React, { Component } from 'react';
import Carregando from '../components/Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    artista: '',
    buttonDisabled: true,
    loading: false,
    artistaAPI: [],
    ApiOn: false,
    nameArtista: '',
  };

  handleChange = ({ target }) => {
    const { value } = target;
    const habilitarBtn = value.length < 2;
    this.setState({
      artista: value,
      buttonDisabled: habilitarBtn,
    });
  };

  handleClick = async () => {
    const { artista } = this.state;
    this.setState({ loading: true });
    const fetchAPI = await searchAlbumsAPI(artista);
    this.setState({
      nameArtista: artista,
      artista: '',
      artistaAPI: fetchAPI,
      loading: false,
      ApiOn: true,
    });
  };

  render() {
    const {
      artista,
      buttonDisabled,
      loading,
      artistaAPI,
      ApiOn,
      nameArtista,
    } = this.state;
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
            onClick={ this.handleClick }
          >
            Pesquisar

          </button>
        </form>
        <section>
          {loading && <Carregando />}
          {ApiOn && (
            <div>
              <h3>{`Resultado de álbuns de: ${nameArtista}`}</h3>
              <ul>
                {artistaAPI.map((e) => (
                  <li key={ e.artistaId }>
                    <img src={ e.artworkUrl100 } alt={ e.artistName } />
                    <h4>{e.collectionName}</h4>
                    <h4>{e.artistName}</h4>
                  </li>
                ))}
              </ul>
            </div>) }

        </section>
      </div>
    );
  }
}
