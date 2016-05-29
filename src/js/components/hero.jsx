var React = require('react');
var Slider = require('react-slick');

module.exports = React.createClass({
  

  render: function() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      fade: true,
      draggable: false,
      slidesToScroll: 1
    };

    var list = this.props.featured.map(function(video) {

      var imageStyle = {
        'backgroundImage': 'url(https://img.youtube.com/vi/'+ video.id + '/hqdefault.jpg)',
        'backgroundSize': 'cover'
      };
      return (<div className="hero-row">
        <div className="hero">
          <div className="hero-image" style={imageStyle}></div>
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