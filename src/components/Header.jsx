import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import logoWhite from '../images/logoWhite.png';
import userImg from '../images/userImg.png';

export default class Header extends Component {
  state = {
    user: '',
    userImgl: '',
    loading: true,
  };

  componentDidMount() {
    this.fetchAPI();
  }

  fetchAPI = async () => {
    const fetchAPI = await getUser();
    const validImage = fetchAPI.image.length > 0 ? fetchAPI.image : userImg;
    this.setState({
      user: fetchAPI.name,
      userImgl: validImage,
      loading: false,
    });
  };

  render() {
    const { user, loading, userImgl } = this.state;
    return (
      <header data-testid="header-component">
        <div className="conteiner-header1">
          <img src={ logoWhite } alt="logo trybe tunes" />
          {loading
            ? <Carregando />
            : (
              <div className="user-icon">
                <img src={ userImgl } alt="" className="header-user-image" />
                <h2 data-testid="header-user-name" className="header-user-name">
                  {user}
                </h2>
                <div />
              </div>)}
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
