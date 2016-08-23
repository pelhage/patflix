import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import Library from '../library';
import Hero from '../hero'

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
  handleVideoClick(videoId) {
    console.log(videoId)
  }

  render() {
    if (!this.props.currentLib) {
      return <div>Preview of Your Library!</div>
    }
    const { libName, videos, allCategories, featuredVideos } = this.props.currentLib
    return (<div>
      <Library videos={videos} categories={allCategories} featured={featuredVideos} onVideoClick={this.handleVideoClick} />
    </div>
    )
  }
}

function mapStateToProps(state) {
  return { currentLib: state.libraries.currentLib };
}

export default connect(mapStateToProps, actions)(ViewLib);
