import React, { Component, PropTypes } from 'react'

class PlayBack extends Component {
	constructor(props) {
		super(props)
		this.state = {
			style: {
				width: window.innerWidth + 'px',
				height: window.innerHeight + 'px'
			}
		}

		this.handleResize = this.handleResize.bind(this)
	}
	// TODO: removeEventListener on component Unmount
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({style: {
  		width: window.innerWidth + 'px',
			height: window.innerHeight + 'px'
			}
		})
  }

	render() {
		const { videoid } = this.props.params
		return (
			<iframe style={this.state.style}
				src={"http://www.youtube.com/embed/"+ videoid + "?autoplay=1"}
				frameBorder="0"
				allowFullScreen></iframe>
		)
	}

}

PlayBack.propTypes = {
	params: PropTypes.string.isRequired
}

export default PlayBack
