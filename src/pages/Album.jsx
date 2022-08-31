import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    musicas: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const music = await getMusics(id);
    this.setState({
      musicas: music,
    });
  }

  render() {
    const { musicas } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
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
                    />
                  </li>
                )
              ))}
            </ul>
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
