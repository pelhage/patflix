import React from 'react'
import Slider from 'react-slick'

var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({


  render: function() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      draggable: false,
      slickGoTo: 1,
      slidesToScroll: 1,
      autoplay: false
    };
    const { videos, featured } = this.props
    if (featured.length) {
      var list = featured.map(function(videoId, index) {

        var imageStyle = {
          'backgroundImage': 'url(https://img.youtube.com/vi/'+ videos[videoId].youtubeId +'/0.jpg)',
          'backgroundSize': 'cover'
        };

        return (<div><div className="hero-row">
          <div className="hero">
            <div className="hero-image" style={imageStyle}></div>
            <div className="vignette"></div>
            <div className="hero-info">
              <div className="hero-details">
                <h1 className="hero-details__title">{videos[videoId].title}</h1>
                <p className="hero-details__description">{videos[videoId].description}</p>
                <div>
                  <Link className="btn btn-primary"
                     to={"/playback/"+ videos[videoId].youtubeId}>
                     &#x25b6;&#xFE0E; Play
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>);
      });
    } else {
      return <div>FUCK</div>
    }

    return (<div className="hero-wrapper">
      <Slider {...settings}>
      {list}
      </Slider>
    </div>);
  }
});
