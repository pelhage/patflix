import React from 'react'
import PropTypes from 'prop-types'
import { TextArea, FormFieldset, FormLabel } from '../Form'

const VideoDescription = (props) => {

  const { description, onUserInput } = props

  return (
    <FormFieldset>
      <FormLabel>Description</FormLabel>
      <p>Write a short summary of what this video is about.</p>
      <TextArea
        name="description"
        value={description}
        onChange={onUserInput} />
    </FormFieldset>
  )
}

VideoDescription.propTypes = {
  description: PropTypes.string,
  onUserInput: PropTypes.func.isRequired
}

export default VideoDescription
