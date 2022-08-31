import React, { Component } from 'react';
import Carregando from '../components/Carregando';
import { getUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
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
    this.setState({
      loading: false,
      info: fetch,
    });
  };

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        {loading
          ? <Carregando />
          : (
            <div>
              <form action="">
                <label htmlFor="name">
                  Nome
                  <input
                    type="text"
                    name="name"
                    id="name"
                    data-testid="edit-input-name"
                  />
                </label>
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    id="email"
                    data-testid="edit-input-email"
                  />
                </label>
                <label htmlFor="descricao">
                  Descrição
                  <textarea
                    name="descricao"
                    id="descricao"
                    data-testid="edit-input-description"
                  />
                </label>
                <label htmlFor="image">
                  Link da imagem
                  <input
                    type="text"
                    name="image"
                    id="image"
                    data-testid="edit-input-image"
                  />
                </label>
                <button
                  type="button"
                  data-testid="edit-button-save"
                >
                  Salvar

                </button>
              </form>
            </div>)}
      </div>
    );
  }
}
