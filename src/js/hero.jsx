var React = require('react');

module.exports = React.createClass({
  render: function() {
    var settings = {
      arrows: true,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return <div className="hero-row">
      <div className="hero">
        <img className="hero-image" src={"https://img.youtube.com/vi/"+ this.props.featured.id + "/maxresdefault.jpg"} />
        <div className="vignette"></div>
        <div className="hero-info">
          <div className="hero-details">
            <h1 className="hero-details__title">{this.props.featured.title}</h1>
            <p className="hero-details__description">{this.props.featured.description}</p>
            <div>
              <a className="upload-video__button upload-video__button--primary"
                 href={"https://youtube.com/watch?v="+ this.props.featured.id}>
                 ▶ Play
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
});

