import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { browserHistory } from 'react-router'

import Library from './Library'

class ViewLib extends Component {
  constructor(props) {
    super(props)
    this.handleVideoClick = this.handleVideoClick.bind(this)
  }

  componentWillMount() {
    if (this.props.params.libId) {
      this.props.fetchLibById(this.props.params.libId)
    }
  }
  // Update Current Video
  handleVideoClick(videoId, youtubeId) {
    browserHistory.push(`/playback/${youtubeId}`)
  }

  render() {
    if (!this.props.currentLib) {
      return <div></div>
    }
    const { libName, videos, allCategories, featuredVideos } = this.props.currentLib
    return (
      <div>
        <Library
          videos={videos}
          categories={allCategories}
          featured={featuredVideos}
          onVideoClick={this.handleVideoClick}
          isPublic="true"
          />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { currentLib: state.libraries.currentLib };
}

export default connect(mapStateToProps, actions)(ViewLib);
