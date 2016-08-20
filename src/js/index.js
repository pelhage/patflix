// React Library
import React from 'react'
import ReactDOM from 'react-dom'
// Redux + Router Libraries
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import reduxThunk from 'redux-thunk'
// Actions + Reducers
import { AUTH_USER } from './actions/types'
import reducers from './reducers'
// HOC for authentication
import requireAuth from './components/require_auth'
// All Components for Patflix
import App from './components/app'
import Libraries from './components/libraries'
import Dashboard from './components/dashboard'
import About from './components/about'
import Signin from './components/auth/signin'
// import Upload from './components/upload  kjs'
import SignUp from './components/auth/signup'
import SignOut from './components/auth/signout'
import Welcome from './components/welcome'
import DeleteLib from './components/libraries/deleteLib'
import ViewLib from './components/libraries/ViewLib'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)
// Ensure user with local token is auth'd
const token = localStorage.getItem('token')
if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={requireAuth(Welcome)}></IndexRoute>
        <Route path="d" component={requireAuth(Libraries)}></Route>
        <Route path="d/:libId"  component={requireAuth(Dashboard)} />
        <Route path="l/:libId"  component={ViewLib} />
        <Route path="r/:libId"  component={requireAuth(DeleteLib)} />
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
