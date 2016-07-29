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
    this.handleInputChange = this.handleInputChange.bind(this)
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
    this.handleInputChange(e)
  }

  handleNameChange(e) {
    this.props.updateLibraryName(e.target.value)
  }
  // URL METHODS //
  hasValidUrl(url) {
    if (url) {
      let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      let match = url.match(regExp);
      return match && match[2].length == 11
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
    let { url, categories } = video
    return this.hasValidUrl(url) //&& this.hasValidCategories(categories)
  }

  // renderCategories
  handleInputChange(e) {
    const currentVideo = this.props.currentVideo
    const { name, value } = e.target
    const updatedVideo = {...currentVideo, [name]: value}
    const isValid = this.isValidVideo(updatedVideo)

    if (name === 'url') {
      updatedVideo.id = this.extractId(value)
    }

    // if (isValid) {
    //   this.props.updateCurrentLib({ ...this.props.currentLib, videos: [updatedVideo] })
    // }

    this.props.updateCurrentVideo({ ...updatedVideo, isValidVideo: isValid })
  }

  handleFeaturedCheck(e) {
    console.log(e.target.value)
  }

  handleCategoryInput(categories) {
    this.props.updateCurrentVideo({ ...this.props.currentVideo, categories })
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
          onUserInput={this.handleInputChange} />

        <VideoFeatured onUserCheck={this.handleFeaturedCheck} />

        <VideoDescription
          description={description}
          onUserInput={this.handleInputChange} />

        <VideoCategories categories={categories} onUserInput={this.handleCategoryInput} />

        <FormFieldset>
          <FormButton onClick={() => {
            let { currentVideo } = this.props
            this.props.addVideoToLibrary(currentVideo)
          }}>Add A Video</FormButton>
        </FormFieldset>

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
    this.props.handleInputChange({...currentVideo, 'id': this.extractedId() })
  }
}

TODO:

-
// setCurrentVideo(index)

// By default, the currentVideo.position is equal to currentLib.size++

// When the user clicks a video, we scan the array and compute its position using indexOf()
// We use that as the reference point for updating or deleting it.

// findIndexOfVideo()

// setCurrentVideo(index)
  // If video index !== currentLib.size++
    // set state to 'update' instead of 'add'
    // enable 'remove' button

// updateCurrentVideo(index)

      // push video to currentLib.videos
  // removeCurrentVideo(index)
    // updatedLib = currentLib.videos.splice(index ,1)
    // currentLib.size--


featureCategory() {

}


[{},{},{},{},{}]

[{},{},{},{},{}]

[{},{},{},{},{}]

[{},{},{},{},{}]

[{},{},{},{},{}]

currentVideo = {
  index: Number,
  id: String,
  url: String,
  isFeatured: Boolean,
  categories: Array,
}

addVideoToLibrary(currentvideo) {
  // let hashId = hashId.encode(currentLib.vidsAdded)
  // currentVideo.videoId = hashId
  // currentLib[hashId] = currentVideo
  // updateState with new video
}

updateVideoInLibrary(hashId, newData) {
  currentLib.videos[hashId] = newData
}

deleteVideoInLibrary(hashId) {
  delete currentLib.videos[hashId]
}

currentLib = {
  size: Integer,
  vidsAdded: Integer, // used to generate unique hashids
  ID: String,
  videos: {
    hashId1: {

    },
    hashId2: {

    }
  },

  categories: Array,
  featuredVideos: Array,
  name: String
}


*/
