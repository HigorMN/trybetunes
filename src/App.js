import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import './style/main.css';
import './style/login.css';
import './style/loading.css';
import './style/search.css';
import './style/album.css';
import './style/favorites.css';
import './style/profile.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/search">
          <Header className1="link1" />
          <Search />
        </Route>
        <Route exact path="/favorites">
          <Header className2="link1" />
          <Favorites />
        </Route>
        <Route exact path="/profile" component={ Profile }>
          <Header className="link1" />
          <Profile />
        </Route>
        <Route exact path="/profile/edit">
          <Header className="link1" />
          <ProfileEdit />
        </Route>
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/" component={ Login } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
