import React, { Component, PropTypes } from 'react'

import nyan from './nyan.svg'

class VideoThumbnail extends Component {

  render() {
    const { videoId } = this.props
    let imgUrl = (videoId) ? 'http://img.youtube.com/vi/'+videoId+'/0.jpg' : nyan

    return (
      <div>
        <img className="tile__img" src={imgUrl} role="presentation" />
      </div>
    )
  }
}

VideoThumbnail.propTypes = {
  videoId: PropTypes.string
}

export default VideoThumbnail
