import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Carregando extends Component {
  render() {
    const { className } = this.props;
    return (
      <div>
        <h1 className={ className }>Carregando...</h1>
      </div>
    );
  }
}

Carregando.propTypes = {
  className: PropTypes.string,
}.isRequired;
