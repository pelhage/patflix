import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import requireAuth from './components/require_auth';
import App from './components/app';

import Library from './components/library';
import Dashboard from './components/dashboard';
import UserList from './components/user-list';
import About from './components/about';
import Signin from './components/auth/signin';

import reducers from './reducers';
import Async from './middlewares/async';

const createStoreWithMiddleware = applyMiddleware(Async)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="dashboard" component={requireAuth(Dashboard)}></Route>
        <Route path="about" component={About}></Route>
        <Route path="users" component={UserList}></Route>
        <Route path="signin" component={Signin}></Route>
      </Route>

    </Router>
  </Provider>
  , document.querySelector('.container')
);
