import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    loading: true,
    info: {},
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const fetch = await getUser();
    console.log(fetch);
    this.setState({ loading: false, info: fetch });
  };

  render() {
    const { loading, info } = this.state;
    return (
      <div data-testid="page-profile">
        {loading
          ? <Carregando />
          : (
            <div>
              <p>{info.name}</p>
              <p>{info.email}</p>
              <p>{info.description}</p>
              <img src={ info.image } alt={ info.name } data-testid="profile-image" />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>)}
      </div>
    );
  }
}
