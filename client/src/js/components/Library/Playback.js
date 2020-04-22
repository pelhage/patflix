import React from 'react'

class Playback extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      style: {
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight - 65}px`,
      },
    }

    this.handleResize = this.handleResize.bind(this)
  }

  // TODO: removeEventListener on component Unmount
  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    this.setState({
      style: {
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight - 65}px`,
      },
    })
  }

  render() {
    const { videoid } = this.props.match.params

    return (
      <iframe
        style={this.state.style}
        src={`http://www.youtube.com/embed/${videoid}?autoplay=1`}
        frameBorder="0"
        allowFullScreen
      />
    )
  }
}

export default Playback
