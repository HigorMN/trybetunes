import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import logoWhite from '../images/logoWhite.png';

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
        <div>
          <img src={ logoWhite } alt="logo trybe tunes" />
          {loading ? <Carregando /> : <h1 data-testid="header-user-name">{user}</h1>}
        </div>

        <nav>
          <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>

      </header>
    );
  }
}
