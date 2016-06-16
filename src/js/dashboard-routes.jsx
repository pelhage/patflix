import React from 'react';

/* React Router Declarations */
import ReactRouter, { Route, Router, hashHistory } from 'react-router';

/* Component Declarations */
import Upload from './components/upload.jsx';

module.exports = (
  <Router history={hashHistory}>
    <Route path="/upload" component={Upload} />
  </Router>
);
