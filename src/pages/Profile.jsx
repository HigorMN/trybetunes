import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import { getUser } from '../services/userAPI';
import userImg from '../images/userImg.png';

export default class Profile extends Component {
  state = {
    loading: true,
    info: {},
    userImgl: '',
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const fetch = await getUser();
    const validImage = fetch.image.length > 0 ? fetch.image : userImg;
    this.setState({
      loading: false,
      info: fetch,
      userEmail: fetch.email.length > 0 ? fetch.email : 'usuario@usuario.com.br',
      userImgl: validImage,
    });
  };

  render() {
    const { loading, info, userImgl, userEmail } = this.state;
    return (
      <div data-testid="page-profile">
        {loading
          ? <Carregando />
          : (
            <div className="container-profile">
              <div className="img-link">
                <img src={ userImgl } alt={ info.name } data-testid="profile-image" />
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
              <div className="container-name">
                <h2>Nome</h2>
                <p>{info.name}</p>
                <h2>Email</h2>
                <p>{userEmail}</p>
                <h2>Descricao</h2>
                <p>{info.description}</p>
              </div>
            </div>)}
      </div>
    );
  }
}
