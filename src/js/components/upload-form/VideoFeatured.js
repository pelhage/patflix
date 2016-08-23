import React, { Component, PropTypes } from 'react'
import { FormFieldset } from '../form'

class VideoFeatured extends Component {
  render() {
    const { onUserCheck, checked } = this.props
    return (<FormFieldset>
      <input id="featured" type="checkbox" checked={checked} value={checked} onChange={onUserCheck} />
      <label htmlFor="featured">Feature this video in your library</label>
    </FormFieldset>)
  }
}

VideoFeatured.propTypes = {
  checked: PropTypes.bool
}

export default VideoFeatured
