import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Carregando extends Component {
  render() {
    const { className } = this.props;
    return (
      <div className={ className }>
        <div className="lds-roller">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
        <h1>Carregando...</h1>
      </div>
    );
  }
}

Carregando.propTypes = {
  className: PropTypes.string,
}.isRequired;
