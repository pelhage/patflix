var React = require('react');
var ReactDOM = require('react-dom');
var Hero = require('./hero.jsx');
var VideoRow = require('./video-row');
var VideoData = require('./video-data');


var App = React.createClass({
  render: function() {

    return (
      <div className="contain">
        <nav><span>PATFLIX</span></nav>
        <Hero featured={this.props.featured} />
        <VideoRow videos={this.props.videos} category="Astronomy" />
        <VideoRow videos={this.props.videos} category="Comedy" />
        <VideoRow videos={this.props.videos} category="Spirituality" />
        <VideoRow videos={this.props.videos} category="Success" />
        <VideoRow videos={this.props.videos} category="Comedy" />
      </div>
    );
  }
});

var element = React.createElement(App, VideoData);
ReactDOM.render(element, document.querySelector('.container'));

/*       */