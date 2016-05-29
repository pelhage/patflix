var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  render: function() {
    return (<nav>
    	<Link to="/"><span>PATFLIX</span></Link>
    	<Link to="/">Home</Link>
    	<Link to="/upload">Upload</Link>
  	</nav>);
  }
});