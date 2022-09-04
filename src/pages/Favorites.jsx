import React, { Component } from 'react';
import Carregando from '../components/Carregando';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    musicas: [],
    loading: true,
    favoritos: [],
  };

  componentDidMount() {
    this.fethFavotire();
  }

  fethFavotire = async () => {
    const fetch = await getFavoriteSongs();
    const filtro = fetch.map((e) => e.trackId);
    this.setState({ loading: false, musicas: fetch, favoritos: filtro });
  };

  handleChange = async ({ target }) => {
    const { value } = target;
    this.setState({ loading: true });
    const fetch = await getFavoriteSongs();
    const filtro = fetch.find((e) => e.trackId === Number(value));
    await removeSong(filtro);
    const novo = await getFavoriteSongs();
    const find = novo.map((e) => e.trackId);
    this.setState({ loading: false, musicas: novo, favoritos: find });
  };

  render() {
    const { loading, musicas, favoritos } = this.state;
    return (
      <div data-testid="page-favorites" className="favorites-container">
        { loading ? <Carregando className="loading-favorites" classNameL="loader" /> : (
          <>
            <h3>Músicas favoritas:</h3>
            <ul className="favorites-list">
              {musicas.map((e, index) => (
                <li key={ index }>
                  <img src={ e.artworkUrl100 } alt="" />
                  <h2>{e.trackName}</h2>
                  <audio data-testid="audio-component" src={ e.previewUrl } controls>
                    <track kind="captions" />
                  </audio>
                  <label
                    htmlFor={ e.trackId }
                    data-testid={ `checkbox-music-${e.trackId}` }
                    className="like"
                  >
                    <p>Favorita</p>
                    <input
                      type="checkbox"
                      value={ e.trackId }
                      name="favorito"
                      id={ e.trackId }
                      checked={ favoritos.find((i) => (i === e.trackId)) }
                      onChange={ this.handleChange }
                    />
                    <i />
                  </label>
                </li>
              ))}
            </ul>
          </>)}
      </div>
    );
  }
}
