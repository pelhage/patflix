var React = require('react');

var Header = require('./header.js');
var Library = require('./library.js');
var localData = require('../library-data.js');

module.exports = React.createClass({
  getInitialState() {
    return {
      data: null
    };
  },
  componentDidMount: function() {
    var reqId = this.props.params.libraryId || 'jVEv5p5Drvf83N7KEVaY';
    var reqUrl = 'http://localhost:8080/l/' + reqId;

    fetch(reqUrl)
      .then(function(res) {
        return res.json();
      }).then(function(text) {
        // console.log('fetch response: ', text);
        this.setState({ data: text });
      }.bind(this));
  },

  content: function() {
    var data = this.state.data;
    return (<Library {...data} />);
  },

  render: function() {
    if (this.state.data === null) {
      return <Header />;
    }
    return (
      <div className="contain" >
        <Header />
        <Library {...this.state.data} />
      </div>
    );
  }
});
