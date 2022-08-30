import React, { Component } from 'react';
import getUser from '../services/userAPI';

export default class Header extends Component {
  state = {
    user: '',
  };

  componentDidMount() {

  }

  feathAPI = () => {
    const fetch = getUser();
  };

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        <h1>{user}</h1>
      </header>
    );
  }
}
