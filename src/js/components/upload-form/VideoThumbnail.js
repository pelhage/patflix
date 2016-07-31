import React, { Component, PropTypes } from 'react'

import { FormFieldset } from '../form'

class VideoThumbnail extends Component {

  render() {
    const { videoId } = this.props

    return (<FormFieldset>
      <div>
        <img className="tile__img" src={"http://img.youtube.com/vi/"+videoId+"/0.jpg"} />
      </div>
    </FormFieldset>)
  }
}

VideoThumbnail.propTypes = {
  videoId: React.PropTypes.string
}

export default VideoThumbnail
