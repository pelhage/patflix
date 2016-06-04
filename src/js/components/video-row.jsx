var React = require('react');
var Slider = require('react-slick');

var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({

  findVideos: function() {
    var category = this.props.category;

    return this.props.videos.filter(function(video) {
      return video.category.indexOf(category) > -1
    });
  },

  render: function() {
    var settings = {
      arrows: true,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      responsive: [
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 3
        }
      },
      { 
        breakpoint: 768, 
        settings: { 
          slidesToShow: 3 
        } 
      }, 
      { 
        breakpoint: 1000, 
        settings: { 
          slidesToShow: 4
        } 
      }]
    };
    var list = this.findVideos().map(function(video) {
      return <div><Link to={"/playback/"+ video.id}>
        <div className="tile">
          <div className="tile__media">
            <div>
              <img className="tile__img" src={"http://img.youtube.com/vi/"+ video.id +"/0.jpg"}  />
            </div>
          </div>
          <div className="tile__details">
            <div className="tile__title">
              {video.title}
            </div>
          </div>
        </div></Link>
      </div>
    });

    return (
      <div className="row">
        <span className="video-category">{this.props.category}</span>
        <Slider {...settings}>
          {list}
        </Slider>
      </div>
    );
  }

});