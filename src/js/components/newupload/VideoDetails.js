import React, { Component } from 'react'

import Input from './Input'
import TextArea from './TextArea'
import FormFieldset from './FormFieldset'
import FormLabel from './FormLabel'
import FormButton from './FormButton'

class VideoDetails extends Component {
  // validateUrl
  // validate
  render() {
    return (<div>
    <FormFieldset>
      <FormLabel>YouTube URL</FormLabel>
      <Input placeholder="Video URL" />
    </FormFieldset>

    <FormFieldset>
      <label>Feature this video in your library</label>
      <Input type="checkbox" />
    </FormFieldset>

    <FormFieldset>
      <FormLabel>Description</FormLabel>
      <p>Write a short summary of what this video is about.</p>
      <TextArea></TextArea>
    </FormFieldset>

    <FormFieldset>
      <FormLabel>Categories</FormLabel>
      <TextArea placeholder="e.g. enter, categories, separated by, commas"></TextArea>
    </FormFieldset>

    <FormFieldset>
      <FormButton>Remove Video From Library</FormButton>
    </FormFieldset>
    </div>)
  }
}

export default VideoDetails
