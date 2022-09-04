import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

export default class MusicCard extends Component {
  state = {
    loading: false,
    checked2: false,
    checked3: true,
  };

  handleChange = async ({ target }) => {
    const { value } = target;
    const { checked } = this.props;
    const { objAPI } = this.props;
    const filtrar = objAPI.find((e) => e.trackId === Number(value));
    if (checked) {
      this.setState({ loading: true });
      await removeSong(filtrar);
      this.setState({ loading: false, checked2: false, checked3: false });
    } else {
      this.setState({ loading: true });
      await addSong(filtrar);
      this.setState({ loading: false, checked2: true });
    }
  };

  render() {
    const { trackName, previewUrl, trackId, checked } = this.props;
    const { loading, checked2, checked3 } = this.state;
    return (
      <div>
        {loading
          ? <Carregando />
          : (
            <div className="album-music">
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
              </audio>
              <label
                htmlFor={ trackId }
                className="like"
                data-testid={ `checkbox-music-${trackId}` }
              >
                <input
                  type="checkbox"
                  value={ trackId }
                  name="favorito"
                  id={ trackId }
                  checked={ (checked3 && checked) || checked2 }
                  onChange={ this.handleChange }
                />
                <i />
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
