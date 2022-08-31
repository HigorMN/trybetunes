import React, { Component } from 'react';
import Carregando from '../components/Carregando';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

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

  render() {
    const { loading, musicas, favoritos } = this.state;
    return (
      <div data-testid="page-favorites">
        { loading ? <Carregando /> : (
          <div>
            <ul>
              {musicas.map((e, index) => (
                <li key={ index }>
                  <MusicCard
                    trackName={ e.trackName }
                    previewUrl={ e.previewUrl }
                    trackId={ e.trackId }
                    objAPI={ musicas }
                    checked={ favoritos.find((i) => (i === e.trackId)) }
                  />
                </li>
              ))}
            </ul>
          </div>)}
      </div>
    );
  }
}
