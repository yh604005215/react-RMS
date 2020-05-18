import React, { Component } from 'react';
import { 
  HashRouter,
  Route,
  Switch,   
  Redirect
} from 'react-router-dom'

import login from '../views/Login'
import Dashboard from '../views/Dashboard';

class Router extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/login" component={login}/>
          {
            <Route path='/' render={() =>
              localStorage.getItem("token") ? <Dashboard /> : <Redirect to="login" />
            }/>
          }
        </Switch>
      </HashRouter>
    );
  }
}

export default Router;
