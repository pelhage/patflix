import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import requireAuth from './components/require_auth';
import Dashboard from './components/dashboard/dashboard';
// import App from './components/app';
import Upload from './components/upload';
import UserList from './components/user-list';

import reducers from './reducers';
import Async from './middlewares/async';

const createStoreWithMiddleware = applyMiddleware(Async)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/dashboard" component={Dashboard}>
        <Route path="upload" component={requireAuth(Upload)}></Route>
        <Route path="users" component={UserList}></Route>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container')
);
