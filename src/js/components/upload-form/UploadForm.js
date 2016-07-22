import React, { Component, PropTypes } from 'react'
import * as actions from '../../actions'
import { connect } from 'react-redux'

/* Component Dependencies */
import { Form, Input, FormFieldset, FormLabel, FormButton } from '../form'

import LibraryName from './LibraryName'
import VideoUrl from './VideoUrl'
import VideoFeatured from './VideoFeatured'
import VideoDescription from './VideoDescription'
import VideoCategories from './VideoCategories'

class UploadForm extends Component {

  constructor(props) {
    super(props)
    // Bind member functions
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.updateCurrentLib = this.updateCurrentLib.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    // URL METHODS //
    this.updateCurrentVideo = this.updateCurrentVideo.bind(this)
    /* */
    this.handleFeaturedCheck = this.handleFeaturedCheck.bind(this)
    // this.renderAllCategories = this.renderAllCategories.bind(this)
    this.handleCategoryInput = this.handleCategoryInput.bind(this)
  }
  // CONFIRMED
  handleFormSubmit() {
    this.props.createLibrary(this.props.currentLib)
  }
  updateCurrentLib() {
    this.props.updateCurrentLib()
  }
  handleDescriptionChange(e) {
    this.updateCurrentVideo(e)
  }

  handleNameChange(e) {
    this.props.updateLibraryName(e.target.value)
  }
  // URL METHODS //
  hasValidUrl(url) {
    if (url) {
      const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length == 11
    }
  }

  isValidVideo(video) {
    let { url, categories } = video
    return this.hasValidUrl(url) //&& this.hasValidCategories(categories)
  }

  // renderCategories
  updateCurrentVideo(e) {
    const currentVideo = this.props.currentVideo
    const { name, value } = e.target
    const updatedVideo = {...currentVideo, [name]: value}
    const isValid = this.isValidVideo(updatedVideo)

    if (isValid) {
      console.log('VIDEO IS VALID!')
      this.props.updateCurrentLib({ ...this.props.currentLib, videos: [updatedVideo] })
    }
    this.props.updateCurrentVideo({ ...updatedVideo, isValidVideo: isValid })
  }

  handleFeaturedCheck(e) {
    console.log(e.target.value)
  }
  // handleUrlValidation() {}
  handleUrlChange(e) {
    console.log('handleUrl', e)
  }

  handleCategoryInput(e) {
    console.log('handleCategoryInput', e)
  }

  render() {
    const {
      currentLib,
      currentVideo: {
        url, isFeatured, description, categories
      }
    } = this.props

    return (<div className="form-container">
      <h2>Add Videos to Your Library</h2>
      <Form onFormSubmit={this.handleFormSubmit}>
        {/* Library Name */}
        <LibraryName onUserInput={this.handleNameChange} />

        {/* Current Video's Details */}
        <VideoUrl
          url={url}
          onUserInput={this.updateCurrentVideo} />
        <VideoFeatured onUserCheck={this.handleFeaturedCheck} />

        <VideoDescription
          description={description}
          onUserInput={this.updateCurrentVideo} />

        <VideoCategories onUserInput={this.handleCategoryInput} />

{/* <FormFieldset>
          <FormButton onClick={() => {
            // let { currentLib, currentVideo } = this.props
            let updatedVideos = [...this.props.currentLib.videos, this.props.currentVideo]
            let categories = this.props.currentVideo.categories.split(",")
            let newLib = {...this.props.currentLib, videos: updatedVideos, allCategories: categories }

            this.props.updateCurrentLib(newLib)
          }}>Add A Video</FormButton>
        </FormFieldset>*/}

        <FormFieldset>
          <FormButton>Save Library</FormButton>
        </FormFieldset>

      </Form>

    </div>)
  }
}

function mapStateToProps(state) {
  return {
    currentLib: state.libraries.currentLib,
    currentVideo: state.libraries.currentVideo
  }
}

export default connect(mapStateToProps, actions)(UploadForm)


/*
setId(url) {
  if (hasValidUrl(url)) {
    this.props.updateCurrentVideo({...currentVideo, 'id': this.extractedId() })
  }
}




*/
