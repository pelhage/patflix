import React, { Component, PropTypes } from 'react'
import { Input, FormFieldset } from '../form'

class VideoFeatured extends Component {

  render() {
    const { onUserCheck, checked } = this.props
    console.log('rendering VideoFeatured. isFeatured: ', checked);
    return (<FormFieldset>
      <label>Feature this video in your library</label>
      <Input type="checkbox" checked={checked} value={checked} onChange={onUserCheck} />
    </FormFieldset>)
  }
}

VideoFeatured.propTypes = {
  checked: React.PropTypes.bool
}

export default VideoFeatured
