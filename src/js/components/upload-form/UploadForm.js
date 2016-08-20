import React, { Component } from 'react'
import * as actions from '../../actions'
import { connect } from 'react-redux'

/* Component Dependencies */
import { Form } from '../form'

// import LibraryName from './LibraryName'
import VideoUrl from './VideoUrl'
import VideoFeatured from './VideoFeatured'
import VideoDescription from './VideoDescription'
import VideoCategories from './VideoCategories'
import VideoThumbnail from './VideoThumbnail'

class UploadForm extends Component {

  constructor(props) {
    super(props)
    // Bind member functions
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.updateCurrentLib = this.updateCurrentLib.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFeaturedCheck = this.handleFeaturedCheck.bind(this)
    this.handleCategoryInput = this.handleCategoryInput.bind(this)
    this.removeVideoFromLibrary = this.removeVideoFromLibrary.bind(this)
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
  handleNameChange(e) {
    this.props.updateLibraryName(e.target.value)
  }
  handleDescriptionChange(e) {
    this.handleInputChange(e)
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

  removeVideoFromLibrary(videoId) {
    this.props.removeVideoFromLibrary(videoId)
  }

  render() {
    // console.log('UploadForm currentVideo',this.props.currentVideo)
    // console.log('UploadForm currentLib',this.props.currentLib)
    const {
      // currentLib: { libName },
      currentVideo: {
        url, youtubeId, isFeatured, description, categories
      }
    } = this.props
    return (<div className="form-container">
      <Form onFormSubmit={this.handleFormSubmit}>
        {/* Library Name
            <LibraryName value={libName} onUserInput={this.handleNameChange} />
        */}

        {/* Current Video's Details */}
        <VideoUrl
          url={url}
          onUserInput={this.handleInputChange} />
        <VideoThumbnail videoId={youtubeId} />
        {/* Whether Current Video is Featured in Hero */}
        <VideoFeatured
          onUserCheck={this.handleFeaturedCheck}
          checked={isFeatured} />
        {/* Description of Current Video */}
        <VideoDescription
          description={description}
          onUserInput={this.handleInputChange} />
        {/* Dynamic Category Enter & Delete */}
        <VideoCategories categories={categories} onUserInput={this.handleCategoryInput} />
      </Form>

    </div>)
  }
}

function mapStateToProps(state) {
  return {
    currentVideo: state.libraries.currentVideo,
    currentLib: state.libraries.currentLib
  }
}

export default connect(mapStateToProps, actions)(UploadForm)


/*

TODO:

-
// setCurrentVideo(index)

// By default, the currentVideo.position is equal to currentLib.size++

// When the user clicks a video, we scan the array and compute its position using indexOf()
// We use that as the reference point for updating or deleting it.


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

  categories: []Array,
  featuredVideos: Array,
  name: String
}

categories: {
  'uncategorized': [],
  'music': ['id1','id2','id3','id4'],
  'soul': ['id4','id5','id4']
}

//

// If this video has no categories, assign it to uncategorized
if (!currentVideo.categories) {
  currentLib.uncategorized.push(currentVideo.videoId),
}

// If category is removed from video...
// Check to see if it exists in currentLib
if (currentLib.categories[category].indexOf(currentVideo.videoId)) {

}

addCategoryToVideo(category) {

}
  currentLib.categories.music.push(currentVideo.id)
*/
