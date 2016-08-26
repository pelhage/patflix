import React, { Component, PropTypes } from 'react'
import { TextArea, FormFieldset, FormLabel } from '../form'

class VideoDescription extends Component {

  render() {
    const { description, onUserInput } = this.props

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
}

VideoDescription.propTypes = {
  description: PropTypes.string,
  onUserInput: PropTypes.func.isRequired
}

export default VideoDescription
