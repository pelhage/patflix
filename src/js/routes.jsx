/* React Router Declarations */
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var Main = require('./components/main.jsx');
var Upload = require('./components/upload.jsx');

module.exports = (
  <Router>
    <Route path="/" component={Main}>
    	<Route path="/upload" component={Upload} />
    </Route>
  </Router>
);
