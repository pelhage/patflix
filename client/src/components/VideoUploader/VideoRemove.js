import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../state/actions'

import removeIcon from '../../images/remove.svg'

class VideoRemove extends React.Component {
  constructor(props) {
    super(props)
    this.removeVideo = this.removeVideo.bind(this)
  }

  removeVideo(videoId) {
    if (this.props.currentVideo.videoId) {
      this.props.removeVideoFromLibrary(this.props.currentVideo.videoId)
    } else if (!this.props.currentVideo.videoId) {
      // TODO
      console.log(
        'VideoRemove removeVideo invoked for video without ID:',
        videoId
      )
    }
  }

  render() {
    return (
      <button className="btn btn-tertiary" onClick={this.removeVideo}>
        <img className="remove-video" src={removeIcon} />
      </button>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentVideo: state.libraries.currentVideo,
  }
}

export default connect(mapStateToProps, actions)(VideoRemove)
