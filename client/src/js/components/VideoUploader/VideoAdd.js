import React from 'react'
import * as actions from '../../actions'
import { connect } from 'react-redux'

class VideoAdd extends React.Component {
  constructor(props) {
    super(props)
    this.addVideo = this.addVideo.bind(this)
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

  addVideo(videoId) {
    let { currentVideo } = this.props
    if (this.isValidVideo(currentVideo)) {
      this.props.addCategoryToLibrary(currentVideo.categories)
      this.props.addVideoToLibrary(currentVideo)
    }
  }

  render() {
    return (
      <button
        className="btn btn-secondary btn-main"
        onClick={this.addVideo}>
        Save Video
      </button>
    )
  }
}

function mapStateToProps(state) {
  return { currentVideo: state.libraries.currentVideo };
}

export default connect(mapStateToProps, actions)(VideoAdd);
