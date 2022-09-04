import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    APIvazio: false,
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
    if (fetchAPI.length === 0) {
      this.setState({
        ApiOn: false,
        loading: false,
        APIvazio: true,
      });
    } else {
      this.setState({
        nameArtista: artista,
        artista: '',
        artistaAPI: fetchAPI,
        loading: false,
        ApiOn: true,
        APIvazio: false,
      });
    }
  };

  render() {
    const {
      artista,
      buttonDisabled,
      loading,
      artistaAPI,
      ApiOn,
      nameArtista,
      APIvazio,
    } = this.state;
    return (
      <div data-testid="page-search" className="container-search">
        <form>
          <input
            type="text"
            value={ artista }
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            onChange={ this.handleChange }
            className="search-input"
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
            onClick={ this.handleClick }
            className="search-button"
          >
            Pesquisar
          </button>
        </form>
        <section className="search-section">
          {loading && <Carregando className="search-loading" classNameL="loader" />}
          {ApiOn && (
            <>
              <h3 className="search-h3">{`Resultado de álbuns de: ${nameArtista}`}</h3>
              <ul className="search-list">
                {artistaAPI.map((e) => (
                  <li key={ e.collectionId } className="serach-album">
                    <Link
                      to={ `/album/${e.collectionId}` }
                      data-testid={ `link-to-album-${e.collectionId}` }
                    >
                      <div className="search-container-img">
                        <img src={ e.artworkUrl100 } alt={ e.artistName } />
                      </div>
                    </Link>
                    <div className="search-container-name">
                      <Link to={ `/album/${e.collectionId}` } className="colecao">
                        <h4>{e.collectionName}</h4>
                      </Link>
                      <p>{e.artistName}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>) }
          {APIvazio && <p className="api-vazio">Nenhum álbum foi encontrado</p>}
        </section>
      </div>
    );
  }
}
