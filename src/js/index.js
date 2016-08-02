// React Library
import React from 'react';
import ReactDOM from 'react-dom';
// Redux + Router Libraries
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
// Actions + Reducers
import { AUTH_USER } from './actions/types';
import reducers from './reducers';
// HOC for authentication
import requireAuth from './components/require_auth';
// All Components for Patflix
import App from './components/app';
import Libraries from './components/libraries'
import Library from './components/library';
import Dashboard from './components/dashboard';
import About from './components/about';
import Signin from './components/auth/signin';
// import Upload from './components/upload  kjs';
import SignUp from './components/auth/signup';
import SignOut from './components/auth/signout';
import Preview from './components/upload/Preview';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
// Ensure user with local token is auth'd
const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="d" component={requireAuth(Libraries)} />
        <Route path="dashboard" component={requireAuth(Dashboard)} />
        <Route path="about" component={About} />
        <Route path="signin" component={Signin} />
        <Route path="signup" component={SignUp} />
        <Route path="signout" component={SignOut} />
      </Route>

    </Router>
  </Provider>
  , document.querySelector('.container')
);
