var React = require('react');
var VideoItem = require('./video-item');

module.exports = React.createClass({
  render: function() {
    var list = this.findVideos().map(function(video) {
      return <VideoItem video={video} key={video.id} />
    });
    return <div className="row">
      <span className="h2">{this.props.category}</span>
      <div className="row__inner">
        {list}
      </div>
    </div>
  },

  findVideos: function() {
    var videosArr = [];

    for (var i = 0, len = this.props.videos.length; i < len; i++) {
      if (this.props.videos[i].category.indexOf(this.props.category) > -1) {
        videosArr.push(this.props.videos[i]);
      } 
    }
    return videosArr;
  }

});