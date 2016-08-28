import React, { PropTypes } from 'react'
import { FormFieldset } from '../Form'

const VideoFeatured = (props) => {
  const { onUserCheck, checked } = props

  return (
    <FormFieldset>
      <input id="featured" type="checkbox" checked={checked} value={checked} onChange={onUserCheck} />
      <label htmlFor="featured">Feature this video in your library</label>
    </FormFieldset>
  )
}

VideoFeatured.propTypes = {
  checked: PropTypes.bool
}

export default VideoFeatured
