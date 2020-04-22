import React from 'react'
import PropTypes from 'prop-types'
import { Input, FormFieldset, FormLabel } from '../Form'

const VideoUrl = (props) => {
  const { url, onUserInput } = props

  return (
    <FormFieldset>
      <FormLabel>YouTube Video URL</FormLabel>
      <Input
        name="url"
        value={url}
        placeholder="Paste a Valid YouTube Video URL"
        onChange={onUserInput}
      />
    </FormFieldset>
  )
}

VideoUrl.propTypes = {
  url: PropTypes.string.isRequired,
  onUserInput: PropTypes.func.isRequired,
}

export default VideoUrl
