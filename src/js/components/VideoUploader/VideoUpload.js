import React, { Component } from 'react'
import * as actions from '../../actions'
import { connect } from 'react-redux'

/* Component Dependencies */
import { Form } from '../Form'

import { VideoUrl, VideoDescription, VideoFeatured,
  VideoCategories, VideoThumbnail } from './'

class VideoUpload extends Component {

  constructor(props) {
    super(props)
    // Bind member functions
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.updateCurrentLib = this.updateCurrentLib.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFeaturedCheck = this.handleFeaturedCheck.bind(this)
    this.handleCategoryInput = this.handleCategoryInput.bind(this)
  }

  // Helper methods
  hasValidUrl(url) {
    if (url) {
      let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      let match = url.match(regExp);
      return match && match[2].length === 11
    }
  }

  extractId(url) {
    if (this.hasValidUrl(url)) {
      let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      let match = url.match(regExp);
      return match[2]
    }
    return ''
  }

  isValidVideo(video) {
    let { url } = video
    return this.hasValidUrl(url)
  }

  handleFormSubmit() {
    this.props.createLibrary(this.props.currentLib)
  }

  updateCurrentLib() {
    this.props.updateCurrentLib()
  }

  handleInputChange(e) {
    let currentVideo = this.props.currentVideo
    let { name, value } = e.target
    let updatedVideo = {...currentVideo, [name]: value}
    const isValid = this.isValidVideo(updatedVideo)

    if (name === 'url') {
      updatedVideo.youtubeId = this.extractId(value)
    }

    this.props.updateCurrentVideo({ ...updatedVideo, isValidVideo: isValid })
  }

  handleFeaturedCheck() {
    let isChecked = !this.props.currentVideo.isFeatured
    let currentVideo = this.props.currentVideo
    this.props.updateCurrentVideo({ ...currentVideo, isFeatured: isChecked })
  }

  handleCategoryInput(categories) {
    this.props.updateCurrentVideo({ ...this.props.currentVideo, categories })
  }

  render() {
    const {
      currentVideo: {
        url, youtubeId, isFeatured, description, categories
      }
    } = this.props
    return (
      <div className="form-container">
        <Form onFormSubmit={this.handleFormSubmit}>
          <VideoUrl
            url={url}
            onUserInput={this.handleInputChange}
          />
          <VideoThumbnail videoId={youtubeId} />
          <VideoFeatured
            onUserCheck={this.handleFeaturedCheck}
            checked={isFeatured}
          />
          <VideoDescription
            description={description}
            onUserInput={this.handleInputChange}
          />
          <VideoCategories
            categories={categories}
            onUserInput={this.handleCategoryInput}
          />
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentVideo: state.libraries.currentVideo,
    currentLib: state.libraries.currentLib
  }
}

export default connect(mapStateToProps, actions)(VideoUpload)
