import React, { Component, PropTypes } from 'react'
import { Input, FormFieldset, FormLabel } from '../form'

class VideoUrl extends Component {

  render() {
    const { url, onUserInput, validate } = this.props

    return (<FormFieldset>
      <FormLabel>YouTube URL </FormLabel>
      <Input
        name="url"
        value={url}
        placeholder="Enter a Valid YoutUbe Video URL"
        onChange={onUserInput} />
    </FormFieldset>)
  }
}

VideoUrl.propTypes = {
  url: React.PropTypes.string.isRequired,
  validate: React.PropTypes.func,
  onUserInput: React.PropTypes.func.isRequired
}

export default VideoUrl

/*
{url && {validate(url)} && <span>not a valid youtube url</span>} 

*/
