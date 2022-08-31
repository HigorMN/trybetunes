import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

export default class MusicCard extends Component {
  state = {
    loading: false,
    checked: false,
  };

  handleChange = async ({ target }) => {
    const { value } = target;
    const { objAPI } = this.props;
    const filtrar = objAPI.find((e) => e.trackId === Number(value));
    this.setState({ loading: true });
    await addSong(filtrar);
    this.setState({ loading: false, checked: true });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        {loading
          ? <Carregando />
          : (
            <div>
              <h2>{trackName}</h2>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
              </audio>
              <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
                Favorita
                <input
                  type="checkbox"
                  value={ trackId }
                  name="favorito"
                  id={ trackId }
                  checked={ checked }
                  onChange={ this.handleChange }
                />
              </label>
            </div>)}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;
