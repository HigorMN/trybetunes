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
    const validImage = fetch.image.length > 0 ? fetchAPI.image : userImg;
    this.setState({ loading: false, info: fetch, userImgl: validImage });
  };

  render() {
    const { loading, info, userImgl } = this.state;
    return (
      <div data-testid="page-profile">
        {loading
          ? <Carregando />
          : (
            <div className="container-profile">
              <img src={ userImgl } alt={ info.name } data-testid="profile-image" />
              <Link to="/profile/edit">Editar perfil</Link>
              <p>{info.name}</p>
              <p>{info.email}</p>
              <p>{info.description}</p>
            </div>)}
      </div>
    );
  }
}
