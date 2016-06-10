var React = require('react');

/* React Router Declarations */
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;

/* Component Declarations */
var Main = require('./components/main.jsx');
var Upload = require('./components/upload.jsx'); 
var Playback = require('./components/playback.jsx');
var About = require('./components/about.jsx');

module.exports = (
  <Router history={hashHistory}>
    <Route path="/l/:libraryId" component={Main} />
    <Route path="/upload" component={Upload} />
  	<Route path="/about" component={About} />
  </Router>
);
