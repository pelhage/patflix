import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../state/actions'

import removeIcon from '../../images/remove.svg'

const VideoRemove = (props) => {
  const removeVideo = (videoId) => {
    if (props.currentVideo.videoId) {
      props.removeVideoFromLibrary(props.currentVideo.videoId)
    } else if (!props.currentVideo.videoId) {
      // TODO
      console.log(
        'VideoRemove removeVideo invoked for video without ID:',
        videoId
      )
    }
  }

  return (
    <button className="btn btn-tertiary" onClick={removeVideo}>
      <img className="remove-video" src={removeIcon} />
    </button>
  )
}

const mapStateToProps = (state) => ({
  currentVideo: state.libraries.currentVideo,
})

export default connect(mapStateToProps, actions)(VideoRemove)
