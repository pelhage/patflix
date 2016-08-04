import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import Library from '../library';
import Hero from '../hero'

class Preview extends Component {
  constructor(props) {
    super(props)
    this.handleVideoClick = this.handleVideoClick.bind(this)
  }

  // Update Current Video
  handleVideoClick(videoId) {
    console.log('[Preview.js] invoking handleVideoClick('+videoId+')')
    console.log('this.props.replaceCurrentVideo('+videoId+')');
    this.props.replaceCurrentVideo(videoId)
    console.log('[Preview.js] finished handleVideoClick('+videoId+')')
  }

  render() {
    if (!this.props.currentLib) {
      return <div>Preview of Your Library!</div>
    }
    const { libName, videos, allCategories, featuredVideos } = this.props.currentLib
    console.log('featuredVideos', featuredVideos)
    console.log('allCategories', allCategories)
    return (<div>
      <h1>{libName}</h1>
      <Library videos={videos} categories={allCategories} featured={featuredVideos} onVideoClick={this.handleVideoClick} />
    </div>
    )
  }
}

function mapStateToProps(state) {
  return { currentLib: state.libraries.currentLib };
}

export default connect(mapStateToProps, actions)(Preview);
