var React = require('react');

module.exports = React.createClass({
  render: function() {
    return <div className="hero-row">
      <div className="hero">
        <img className="hero-image" src={"http://img.youtube.com/vi/"+ this.props.featured.id + "/maxresdefault.jpg"} />
        <div className="vignette"></div>
        <div className="hero-info">
          <div className="hero-details">
            <h1>{this.props.featured.title}</h1>
            <p>{this.props.featured.description}</p>
          </div>
        </div>
      </div>
    </div>
  }
});

