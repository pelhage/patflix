import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';

import requireAuth from './components/require_auth';
import Dashboard from './components/dashboard/dashboard';
import Upload from './components/upload';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/dashboard" component={Dashboard}>
        <Route path="upload" component={requireAuth(Upload)}></Route>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container')
);
