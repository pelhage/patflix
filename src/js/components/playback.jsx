var React = require('react');

module.exports = React.createClass({

	validateID: function() {
		return true;
	},

	getInitialState: function() {
		return { style: {
			width: window.innerWidth + 'px',
			height: window.innerHeight + 'px'
			}
		}
	},

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  handleResize: function() {
    this.setState({style: {
  		width: window.innerWidth + 'px',
			height: window.innerHeight + 'px'
			}
		});
  },

	render: function() {
		return (<iframe style={this.state.style}
			src={"http://www.youtube.com/embed/"+ this.props.params.videoid + "?autoplay=1"}
			frameBorder="0" 
			allowFullScreen></iframe>);
	}
});