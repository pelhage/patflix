var React = require('react');
var Slider = require('react-slick');

module.exports = React.createClass({
  
  findVideos: function() {
    var videosArr = [];
    this.props.featured.forEach(function(item) {
      videosArr.push(item)
    });
    return videosArr;
  },


  render: function() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      fade: true,
      slidesToScroll: 1
    };

    var list = this.findVideos().map(function(video) {
      return (<div className="hero-row">
        <div className="hero">
          <img className="hero-image" src={"https://img.youtube.com/vi/"+ video.id + "/sddefault.jpg"} />
          <div className="vignette"></div>
          <div className="hero-info">
            <div className="hero-details">
              <h1 className="hero-details__title">{video.title}</h1>
              <p className="hero-details__description">{video.description}</p>
              <div>
                <a className="upload-video__button upload-video__button--primary"
                   href={"https://youtube.com/watch?v="+ video.id}>
                   ▶ Play
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>);
    });
    
    return (<div className="hero-wrapper">
      <Slider {...settings}>
      {list}
      </Slider>
    </div>);
  }
});

/**

var list = this.findVideos().map(function(video) {
  return (
<div className="hero-row">
  <div className="hero">
    <img className="hero-image" src={"https://img.youtube.com/vi/"+ video.id + "/0.jpg"} />
    <div className="vignette"></div>
    <div className="hero-info">
      <div className="hero-details">
        <h1 className="hero-details__title">{video.title}</h1>
        <p className="hero-details__description">{video.description}</p>
        <div>
          <a className="upload-video__button upload-video__button--primary"
             href={"https://youtube.com/watch?v="+ video.id}>
             ▶ Play
          </a>
        </div>
      </div>
    </div>
  </div>
  </div>);
});
**/