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
          ? <Carregando className="search-loading" classNameL="loader" />
          : (
            <form className="profile-edit-container">
              <div className="img-link-edit">
                <div>
                  <img src={ image } alt="" />
                </div>
                <label htmlFor="image">
                  <input
                    value={ image }
                    type="text"
                    name="image"
                    id="image"
                    className="form-control"
                    data-testid="edit-input-image"
                    onChange={ this.handleChange }
                    placeholder="Insira o link da imagem"
                  />
                </label>
              </div>
              <label htmlFor="name">
                <h2>Nome</h2>
                <p>Fique à vontade para usar seu nome social</p>
                <input
                  value={ name }
                  type="text"
                  name="name"
                  id="name"
                  data-testid="edit-input-name"
                  className="form-control"
                  placeholder="Seu nome"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="email">
                <h2>Email</h2>
                <p>Escolha um e-mail que consulte diariamente</p>
                <input
                  value={ email }
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  data-testid="edit-input-email"
                  placeholder="usuario@usuario.com.br"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="descricao">
                <h2>Descrição</h2>
                <textarea
                  value={ description }
                  name="description"
                  id="descricao"
                  className="form-control"
                  data-testid="edit-input-description"
                  placeholder="Sobre mim"
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="button"
                data-testid="edit-button-save"
                onClick={ this.handleClick }
                disabled={ !btnDisabled }
                className="search-button"
              >
                salvar
              </button>
            </form>)}
        {redirect && <Redirect to="/profile" />}
      </div>
    );
  }
}
