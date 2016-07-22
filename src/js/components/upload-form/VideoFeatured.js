import React, { Component, PropTypes } from 'react'
import { Input, FormFieldset } from '../form'

class VideoFeatured extends Component {

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
