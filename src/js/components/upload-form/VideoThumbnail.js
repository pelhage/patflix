import React, { Component, PropTypes } from 'react'

class VideoThumbnail extends Component {

  render() {
    const { onUserCheck } = this.props

    return (<FormFieldset>
      <label>Feature this video in your library</label>
      <Input type="checkbox" onChange={onUserCheck} />
    </FormFieldset>)
  }
}

VideoFeatured.propTypes = {
  onUserCheck: React.PropTypes.func.isRequired
}

export default VideoFeatured
