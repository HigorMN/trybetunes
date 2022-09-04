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

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/search">
          <Header />
          <Search />
        </Route>
        <Route exact path="/favorites">
          <Header />
          <Favorites />
        </Route>
        <Route exact path="/profile" component={ Profile }>
          <Header />
          <Profile />
        </Route>
        <Route exact path="/profile/edit">
          <Header />
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
