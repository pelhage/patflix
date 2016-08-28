import React, { PropTypes } from 'react'

import nyan from './nyan.svg'

const VideoThumbnail = (props) => {
  const { videoId } = props
  let imgUrl = (videoId) ? 'http://img.youtube.com/vi/'+videoId+'/0.jpg' : nyan

  return (
    <div>
      <img className="tile__img" src={imgUrl} role="presentation" />
    </div>
  )
}

VideoThumbnail.propTypes = {
  videoId: PropTypes.string
}

export default VideoThumbnail
