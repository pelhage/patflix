var React = require('react');
var Slider = require('react-slick');
var VideoItem = require('./video-item');

module.exports = React.createClass({
  render: function() {
    var settings = {
      arrows: true,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };
    var list = this.findVideos().map(function(video) {
      return <VideoItem video={video} key={video.id} />
    });
    return (
      <div className="row">
        <span className="h2">{this.props.category}</span>
        <Slider className="row__inner" {...settings}>
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

      // <div className="row">
      //   <span className="h2">{this.props.category}</span>
      //   <div className="row__inner">
      //     {list}
      //   </div>
      // </div>