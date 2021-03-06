// React Library
import React from 'react'
require('./scss/style.scss')
import ReactDOM from 'react-dom'
// Redux + Router Libraries
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Switch, Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import reduxThunk from 'redux-thunk'
// Actions + Reducers
import { AUTH_USER } from './state/actions/types'
import reducers from './state/reducers'
// HOC for authentication
import requireAuth from './components/Auth/RequireAuth'

// All Components for Patflix
import App from './components/Layout'

import Libraries from './pages/Libraries'
import DeleteLib from './pages/DeleteLib'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Welcome from './pages/Welcome'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import SignOut from './pages/SignOut'
import Playback from './pages/Playback'
import ViewLib from './pages/ViewLib'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)
// Ensure user with local token is auth'd
const token = localStorage.getItem('token')
if (token) {
  store.dispatch({
    type: AUTH_USER,
  })
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}

const Index = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <Router>
        <App>
          <Switch>
            <Route exact path="/" component={requireAuth(Welcome)} />
            <Route exact path="/d" component={requireAuth(Libraries)} />
            <Route exact path="/d/:libId" component={requireAuth(Dashboard)} />
            <Route exact path="/l/:libId" component={ViewLib} />
            <Route exact path="/r/:libId" component={requireAuth(DeleteLib)} />
            <Route exact path="/playback/:videoid" component={Playback} />
            <Route exact path="/dashboard" component={requireAuth(Dashboard)} />
            <Route exact path="/about" component={About} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signout" component={SignOut} />
          </Switch>
        </App>
      </Router>
    </Provider>
  </ErrorBoundary>
)
//
ReactDOM.render(<Index />, document.getElementById('root'))
