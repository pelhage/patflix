var React = require('react');
var Slider = require('react-slick');

module.exports = React.createClass({
  
  findVideos: function() {
    var videosArr = [];
    console.log(this.props.featured);
    this.props.featured.forEach(function(item) {
      videosArr.push(item)
    });
    return videosArr;
  },


  render: function() {
    var settings = {
      arrows: true,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    var list = this.findVideos().map(function(video) {
      return (<div className="hero">
        <img className="hero-image" src={"https://img.youtube.com/vi/"+ video.id + "/maxresdefault.jpg"} />
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
      </div>);
    });

    return <div className="hero-row">
      <Slider {...settings}>
        {list}
      </Slider>
    </div>
  }
});

