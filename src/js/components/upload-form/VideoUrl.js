import React, { Component, PropTypes } from 'react'
import { Input, FormFieldset, FormLabel } from '../form'

class VideoUrl extends Component {

  render() {
    const { url, onUserInput } = this.props

    return (<FormFieldset>
      <FormLabel>YouTube Video URL</FormLabel>
      <Input
        name="url"
        value={url}
        placeholder="Paste a Valid YouTube Video URL"
        onChange={onUserInput} />
    </FormFieldset>)
  }
}

VideoUrl.propTypes = {
  url: PropTypes.string.isRequired,
  validate: PropTypes.func,
  onUserInput: PropTypes.func.isRequired
}

export default VideoUrl

/*
{url && {validate(url)} && <span>not a valid youtube url</span>}

*/
