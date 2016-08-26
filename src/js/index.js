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
import requireAuth from './components/Auth/RequireAuth'

// All Components for Patflix
import App from './components/App'

import { Libraries } from './components/Libraries'
import { Dashboard } from './components/Dashboard'
import { About, Welcome } from './components/Pages'
import { SignIn, SignUp, SignOut } from './components/Auth'
import { PlayBack, ViewLib } from './components/Library'
import { DeleteLib } from './components/Libraries/'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers, window.devToolsExtension && window.devToolsExtension())
// Ensure user with local token is auth'd
const token = localStorage.getItem('token')
if (token) {
  store.dispatch({ type: AUTH_USER });
}
//
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={requireAuth(Welcome)}></IndexRoute>
        <Route path="d" component={requireAuth(Libraries)}></Route>
        <Route path="d/:libId"  component={requireAuth(Dashboard)} />
        <Route path="l/:libId"  component={ViewLib} />
        <Route path="r/:libId"  component={requireAuth(DeleteLib)} />
        <Route path="/playback/:videoid" component={PlayBack} />
        <Route path="dashboard" component={requireAuth(Dashboard)} />
        <Route path="about" component={About} />
        <Route path="signin" component={SignIn} />
        <Route path="signup" component={SignUp} />
        <Route path="signout" component={SignOut} />
      </Route>

    </Router>
  </Provider>
  , document.querySelector('.container')
);
