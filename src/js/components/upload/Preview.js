import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import Library from '../library';
import rowPreviewImg from '../slide-row.png'

class Preview extends Component {
  constructor(props) {
    super(props)
    this.handleVideoClick = this.handleVideoClick.bind(this)
  }

  // Update Current Video
  handleVideoClick(videoId) {
    this.props.replaceCurrentVideo(videoId)
  }

  render() {
    let videoRowImg = <img className="placeholder" src={rowPreviewImg} />;
    let placeHolder = '';
    if (!this.props.currentLib.size) {
      placeHolder = videoRowImg
    }
    const { libName, videos, allCategories, featuredVideos } = this.props.currentLib
    console.log('PREVIEW currentLib.allCategories', this.props.currentLib.allCategories)
    return (<div>
      <h3>{libName}</h3>
      <Library videos={videos} categories={allCategories} featured={featuredVideos} onVideoClick={this.handleVideoClick} />
      {placeHolder}
    </div>
    )
  }
}

function mapStateToProps(state) {
  return { currentLib: state.libraries.currentLib };
}

export default connect(mapStateToProps, actions)(Preview);
