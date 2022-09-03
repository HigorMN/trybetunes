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
        <div className="conteiner-header-cima">
          <img src={ logoWhite } alt="logo trybe tunes" className="header-logo" />
          <div />
          {loading
            ? (
              <Carregando
                className="user-icon user-loading"
                classNameL="loader-min"
              />)
            : (
              <div className="user-icon">
                <img src={ userImgl } alt="" className="header-user-image" />
                <h2 data-testid="header-user-name" className="header-user-name">
                  {user}
                </h2>
                <div />
              </div>)}
        </div>

        <nav className="header-nav">
          <Link
            data-testid="link-to-search"
            to="/search"
            className="link"
          >
            Pesquisa
          </Link>
          <Link
            data-testid="link-to-favorites"
            to="/favorites"
            className="link"
          >
            Favoritas
          </Link>
          <Link
            data-testid="link-to-profile"
            to="/profile"
            className="link"
          >
            Perfil
          </Link>
        </nav>

      </header>
    );
  }
}
