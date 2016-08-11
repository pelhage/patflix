import React, { Component, PropTypes } from 'react'

import { FormFieldset } from '../form'

class VideoThumbnail extends Component {

  render() {
    const { videoId } = this.props
    let imgUrl = 'http://img.youtube.com/vi/'+videoId+'/0.jpg'
    if (!videoId) {
      imgUrl = '/dist/nyan.svg'
    }

    return (<div>
      <img className="tile__img" src={imgUrl} />
    </div>)
  }
}

VideoThumbnail.propTypes = {
  videoId: React.PropTypes.string
}

export default VideoThumbnail
