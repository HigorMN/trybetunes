import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';

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
    console.log(musicas);
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
