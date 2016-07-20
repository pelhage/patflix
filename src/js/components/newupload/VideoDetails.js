import React, { Component } from 'react'
import * as actions from '../../actions'
import { connect } from 'react-redux'

import Input from '../form/Input'
import TextArea from '../form/TextArea'
import FormFieldset from '../form/FormFieldset'
import FormLabel from '../form/FormLabel'
import FormButton from '../form/FormButton'

class VideoDetails extends Component {
  constructor(props) {
    super(props)
    // Bind member functions
    this.updateCurrentLib = this.updateCurrentLib.bind(this)
    this.isValidVideo = this.isValidVideo.bind(this)
    this.hasValidUrl = this.hasValidUrl.bind(this)
    this.hasValidCategories = this.hasValidCategories.bind(this)
    this.updateCurrentVideo = this.updateCurrentVideo.bind(this)
    this.normalizeCategories = this.normalizeCategories.bind(this)
    this.renderCategories = this.renderCategories.bind(this)
    // this.normalizeCategories = this.normalizeCategories.bind(this)
    // this.normalizeCategories = this.normalizeCategories.bind(this)
    // this.normalizeCategories = this.normalizeCategories.bind(this)
    // this.normalizeCategories = this.normalizeCategories.bind(this)
  }

  hasValidUrl(url) {
    if (url) {
      const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length == 11
    }
  }

  setId(url) {
    if (hasValidUrl(url)) {
      this.props.updateCurrentVideo({...currentVideo, 'id': this.extractedId() })
    }
  }

  normalizeCategories(commaStr) {
    return commaStr.split(',').map((category) => {
      return category.trim()
    }).filter((category) => {
      return category.length
    })
  }

  renderCategories(categories) {
    let videoCategories = categories.map((category) => {
      return <span>{category}</span>
    })
    return <div>{videoCategories}</div>
  }

  isValidVideo(video) {
    let { url, categories } = video
    return this.hasValidUrl(url) && this.hasValidCategories(categories)
  }

  hasValidCategories(categoriesStr) {
    return categoriesStr.split(",").indexOf("") === -1
  }
  // renderCategories
  updateCurrentVideo(e) {
    let currentVideo = this.props.currentVideo
    let { name, value } = e.target
    let updatedVideo = {...currentVideo, [name]: value}
    // console.log('updateCurrentVideo: ', currentVideo)
    let isValid = this.isValidVideo(updatedVideo)
    if (isValid) {
      this.props.updateCurrentVideo({...updatedVideo, isValidVideo: isValid })
      this.props.updateCurrentLib({...this.props.currentLib, videos: [updatedVideo] })
    } else {
      this.props.updateCurrentVideo({...updatedVideo, isValidVideo: isValid })
    }

  }

  handleDescriptionInput(e) {
    normalizeCategories(e.target.value)
    this.updateCurrentVideo(e)
  }


  updateCurrentLib() {
    let currentLib = this.props.currentLib
    if (this.isValidVideo()) {
      this.props.updateCurrentLib()
    }
  }

  render() {
    const { url, isFeatured, description, categories } = this.props.currentVideo
    console.log(this.props.currentVideo)


    return (<div>
    <FormFieldset>
      <FormLabel>YouTube URL {url && !this.hasValidUrl(url) && <span>not a valid youtube url</span>} </FormLabel>
      <Input
        name="url"
        value={url}
        placeholder="Video URL"
        onChange={this.updateCurrentVideo}/>
    </FormFieldset>

    <FormFieldset>
      <label>Feature this video in your library</label>
      <Input type="checkbox" />
    </FormFieldset>

    <FormFieldset>
      <FormLabel>Description</FormLabel>
      <p>Write a short summary of what this video is about.</p>
      <TextArea
        name="description"
        value={description}
        onChange={this.updateCurrentVideo} />
    </FormFieldset>

    <FormFieldset>
      <FormLabel>Categories</FormLabel>
      <TextArea
        name="categories"
        placeholder="e.g. enter, categories, separated by, commas"
        value={categories}
        onChange={this.handleCategories} />
    </FormFieldset>

    <FormFieldset>
      <FormButton>Remove Video From Library</FormButton>
    </FormFieldset>
    </div>)
  }
}

function mapStateToProps(state) {
  return {
    currentVideo: state.libraries.currentVideo
  }
}

export default connect(mapStateToProps, actions)(VideoDetails)
