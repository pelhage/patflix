import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../../state/actions'
import nyan from './nyan.svg'
import { Form, TextArea, FormFieldset, FormLabel } from '../Form'

import { VideoUrl, VideoFeatured, VideoCategories } from '.'

const VideoDescription = ({ description, onUserInput }) => (
  <FormFieldset>
    <FormLabel>Description</FormLabel>
    <p>Write a short summary of what this video is about.</p>
    <TextArea name="description" value={description} onChange={onUserInput} />
  </FormFieldset>
)
VideoDescription.propTypes = {
  description: PropTypes.string,
  onUserInput: PropTypes.func.isRequired,
}

const hasValidUrl = (url) => {
  if (url) {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11
  }
}

const isValidVideo = (video) => {
  const { url } = video
  return hasValidUrl(url)
}

const VideoThumbnail = ({ videoId }) => {
  const imgUrl = videoId ? `http://img.youtube.com/vi/${videoId}/0.jpg` : nyan
  return (
    <div>
      <img className="tile__img" src={imgUrl} role="presentation" />
    </div>
  )
}
VideoThumbnail.propTypes = {
  videoId: PropTypes.string,
}

class VideoUpload extends React.Component {
  extractId = (url) => {
    if (hasValidUrl(url)) {
      const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
      const match = url.match(regExp)
      return match[2]
    }
    return ''
  }

  handleFormSubmit = () => {
    this.props.createLibrary(this.props.currentLib)
  }

  updateCurrentLib = () => {
    this.props.updateCurrentLib()
  }

  handleInputChange = (e) => {
    const { currentVideo } = this.props
    const { name, value } = e.target
    const updatedVideo = {
      ...currentVideo,
      [name]: value,
    }
    const isValid = isValidVideo(updatedVideo)

    if (name === 'url') {
      updatedVideo.youtubeId = this.extractId(value)
    }

    this.props.updateCurrentVideo({
      ...updatedVideo,
      isValidVideo: isValid,
    })
  }

  handleFeaturedCheck = () => {
    const isChecked = !this.props.currentVideo.isFeatured
    const { currentVideo } = this.props
    this.props.updateCurrentVideo({
      ...currentVideo,
      isFeatured: isChecked,
    })
  }

  handleCategoryInput = (categories) => {
    this.props.updateCurrentVideo({
      ...this.props.currentVideo,
      categories,
    })
  }

  render() {
    const {
      currentVideo: { url, youtubeId, isFeatured, description, categories },
    } = this.props
    return (
      <div className="form-container">
        <Form onFormSubmit={this.handleFormSubmit}>
          <VideoUrl url={url} onUserInput={this.handleInputChange} />
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

const mapStateToProps = (state) => ({
  currentVideo: state.libraries.currentVideo,
  currentLib: state.libraries.currentLib,
})

export default connect(mapStateToProps, actions)(VideoUpload)
