import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    user: '',
    loading: true,
  };

  componentDidMount() {
    this.fetchAPI();
  }

  fetchAPI = async () => {
    const fetchAPI = await getUser();
    this.setState({ user: fetchAPI.name, loading: false });
  };

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">{loading ? <p>Carregando...</p> : user}</h1>
      </header>
    );
  }
}
