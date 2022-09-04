import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Carregando from '../components/Carregando';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    loading: false,
    btnDisabled: false,
    redirect: false,
    name: '',
    email: '',
    image: '',
    description: '',
  };

  componentDidMount() {
    this.fetchUser();
    const redirecionamento = async () => {
      const fetch = await getUser();
      this.setState({
        name: fetch.name,
        email: fetch.email,
        image: fetch.image,
        description: fetch.description,
      }, this.validacao);
    };
    redirecionamento();
  }

  fetchUser = async () => {
    this.setState({ loading: true });
    const fetch = await getUser();
    this.setState({
      loading: false,
      name: fetch.name,
      email: fetch.email,
      image: fetch.image,
      description: fetch.description,
    });
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      [target.name]: value,
    }, this.validacao);
  };

  validacao = () => {
    const { name, email, description, image } = this.state;
    const valid = !!(
      name.length > 0
      && email.length > 0
      && description.length > 0
      && image.length > 0);
    this.setState({ btnDisabled: valid });
  };

  handleClick = async () => {
    this.setState({ loading: true });
    const { name, image, email, description } = this.state;
    await updateUser({ name, image, email, description });
    this.setState({ redirect: true, loading: false });
  };

  render() {
    const {
      loading,
      name,
      email,
      image,
      description,
      btnDisabled,
      redirect } = this.state;
    return (
      <div data-testid="page-profile-edit">
        {loading
          ? <Carregando />
          : (
            <div className="profile-edit-container">
              <label htmlFor="name">
                Nome
                <input
                  value={ name }
                  type="text"
                  name="name"
                  id="name"
                  data-testid="edit-input-name"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="email">
                Email
                <input
                  value={ email }
                  type="email"
                  name="email"
                  id="email"
                  data-testid="edit-input-email"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="descricao">
                Descrição
                <textarea
                  value={ description }
                  name="description"
                  id="descricao"
                  data-testid="edit-input-description"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="image">
                Link da imagem
                <input
                  value={ image }
                  type="text"
                  name="image"
                  id="image"
                  data-testid="edit-input-image"
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="button"
                data-testid="edit-button-save"
                onClick={ this.handleClick }
                disabled={ !btnDisabled }
              >
                salvar

              </button>
            </div>)}
        {redirect && <Redirect to="/profile" />}
      </div>
    );
  }
}
