var React = require('react');

module.exports = React.createClass({
	render: function() {
		return <div className="tile">
      <div className="tile__media">
        <img className="tile__img" src={"http://img.youtube.com/vi/"+ this.props.video.id + "/0.jpg"}  />
      </div>
      <div className="tile__details">
        <div className="tile__title">
          {this.props.video.title}
        </div>
      </div>
    </div>
	}
});