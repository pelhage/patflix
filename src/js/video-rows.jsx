var React = require('react');
var VideoRow = require('./video-row');

module.exports = React.createClass({
  
  render: function() {
    var list = this.findVideos().map(function(video) {
      return <div>
        <div className="tile">
          <div className="tile__media">
            <img className="tile__img" src={"http://img.youtube.com/vi/"+ video.id + "/0.jpg"}  />
          </div>
          <div className="tile__details">
            <div className="tile__title">
              {video.title}
            </div>
          </div>
        </div>
      </div>
    });
    return (
      <div className="row">
        <span className="h2">{this.props.category}</span>
        <Slider {...settings}>
          {list}
        </Slider>
      </div>
    );
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