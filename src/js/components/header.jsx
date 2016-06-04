var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  render: function() {
    return (<nav className="nav">
    	<Link className="nav__item nav__item--brand" to="/">PATFLIX</Link>
    	<Link to="/upload">Upload</Link>
    	{<Link className="nav__item nav__item--pull-right" to="/about">About Patflix</Link>}
  	</nav>);
  }
});