import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../components/Carregando';

export default class Album extends Component {
  state = {
    musicas: [],
    loading: true,
    favoritos: [],
  };

  componentDidMount() {
    this.fetchMusics();
    this.fetchFavorite();
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const music = await getMusics(id);
    this.setState({
      musicas: music,
    });
  };

  fetchFavorite = async () => {
    const favorito = await getFavoriteSongs();
    const filtro = favorito.map((e) => e.trackId);
    this.setState({ loading: false, favoritos: filtro });
  };

  render() {
    const { musicas, loading, favoritos } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading
          ? <Carregando />
          : (
            <div>
              {musicas.length > 0 && (
                <div>
                  <p data-testid="artist-name">{musicas[0].artistName}</p>
                  <p data-testid="album-name">{musicas[0].collectionName}</p>
                  <ul>
                    {musicas.map((e, index) => (
                      index > 0 && (
                        <li key={ index }>
                          <MusicCard
                            trackName={ e.trackName }
                            previewUrl={ e.previewUrl }
                            trackId={ e.trackId }
                            objAPI={ musicas }
                            checked={ favoritos.find((i) => (i === e.trackId)) }
                          />
                        </li>
                      )
                    ))}
                  </ul>
                </div>)}
            </div>)}

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
