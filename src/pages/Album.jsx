import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const music = getMusics(id);
  }

  render() {
    return (
      <div data-testid="page-album">Album</div>
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
