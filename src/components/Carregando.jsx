import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Carregando extends Component {
  render() {
    const { className, classNameL } = this.props;
    return (
      <div className={ className }>
        <div className={ classNameL } />
        <h1>Carregando...</h1>
        <div />
      </div>
    );
  }
}

Carregando.propTypes = {
  className: PropTypes.string,
}.isRequired;
