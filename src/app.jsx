var React = require('react');
var ReactDOM = require('react-dom');
var VideoRow = require('./video-row');
var VideoData = require('./video-data');
var App = React.createClass({
  render: function() {
    return <div className="contain">
      <h1>CSS Netflix Video Carousel</h1>
      <VideoRow videos={this.props.videos} category="Astronomy" />
      <VideoRow videos={this.props.videos} category="Comedy" />
      <VideoRow videos={this.props.videos} category="Spirituality" />
      <VideoRow videos={this.props.videos} category="Success" />
    </div>
  }
});

var element = React.createElement(App, VideoData);
ReactDOM.render(element, document.querySelector('.container'));