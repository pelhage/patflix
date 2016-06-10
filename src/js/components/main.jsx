var React = require('react');

var Header = require('./header.jsx');
var Library = require('./library.jsx');
var localData = require('../library-data.js');


module.exports = React.createClass({
  
  getInitialState: function() {
    return {
      data: localData
    };
  },

  componentDidMount: function() {
    var reqId = this.props.params.libraryId;
    var reqUrl = '/l/' + reqId;
    
    this.serverRequest = fetch(reqUrl)
      .then(function(res) {
        return res.json();
      }).then(function(text) {
        console.log('RESPONSE TEXT: ', text);
        this.setState({ data: text.data });
      }.bind(this));
  },

  content: function() {
    if (this.props.children) {
      return this.props.children;
    } else {
      var data = this.state.data;
      console.log(data);
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