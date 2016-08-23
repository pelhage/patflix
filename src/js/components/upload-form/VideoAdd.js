import React, { Component } from 'react'
import * as actions from '../../actions'
import { connect } from 'react-redux'

class VideoAdd extends Component {
  constructor(props) {
    super(props)
    this.addVideo = this.addVideo.bind(this)
  }

  addVideo(videoId) {
    let { currentVideo } = this.props
    this.props.addCategoryToLibrary(currentVideo.categories)
    this.props.addVideoToLibrary(currentVideo)
  }

  render() {
    return (<button
      className="btn btn-secondary btn-main"
      onClick={this.addVideo}>Save Video
    </button>)
  }
}

function mapStateToProps(state) {
  return { currentVideo: state.libraries.currentVideo };
}

export default connect(mapStateToProps, actions)(VideoAdd);
