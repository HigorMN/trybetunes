import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
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
    if (musicas.length > 0) {
      const name = musicas[0].artistName;
      return (
        <div data-testid="page-album">
          <Header />
          <p>{name}</p>
        </div>
      );
    }
    return (
      <div data-testid="page-album">
        <Header />
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
