import React from 'react'
import PropTypes from 'prop-types'
import { FormFieldset } from '../Form'

const VideoFeatured = ({ onUserCheck, checked }) => (
  <FormFieldset>
    <input
      id="featured"
      type="checkbox"
      checked={checked}
      value={checked}
      onChange={onUserCheck}
    />
    <label htmlFor="featured">Feature this video in your library</label>
  </FormFieldset>
)

VideoFeatured.propTypes = {
  checked: PropTypes.bool,
}

export default VideoFeatured
