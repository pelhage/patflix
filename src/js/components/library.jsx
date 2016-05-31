var React = require('react');

var Hero = require('./hero.jsx');
var VideoRow = require('./video-row.jsx');

module.exports = React.createClass({

  render: function() {
    return (
      <div className="contain" >
        <Hero featured={this.props.featured} />
        <VideoRow videos={this.props.videos} category="Astronomy" />
        <VideoRow videos={this.props.videos} category="Comedy" />
        <VideoRow videos={this.props.videos} category="Spirituality" />
        <VideoRow videos={this.props.videos} category="Success" />
      </div>
    );
  }
});