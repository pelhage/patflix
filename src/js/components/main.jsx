var React = require('react');

var Header = require('./header.jsx');
var Library = require('./library.jsx');
var data = require('../library-data.js');


module.exports = React.createClass({

  content: function() {
    if (this.props.children) {
      return this.props.children;
    } else {
      return (<Library {...data} />);
    }
  },

  render: function() {
    return (
      <div className="contain" >
        <Header />
        {this.content()}
      </div>
    );
  }
});