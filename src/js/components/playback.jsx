var React = require('react');

module.exports = React.createClass({
	validateID: function() {
		return true;
	},
	render: function() {
		return (<div className="videoWrapper">
			<iframe 
			src={"http://www.youtube.com/embed/"+ this.props.params.videoid}
			frameborder="0" 
			allowFullScreen></iframe>
		</div>);
	}
});