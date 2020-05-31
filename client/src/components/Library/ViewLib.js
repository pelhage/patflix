import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import history from '../../routing/history'

import Library from './Library'

class ViewLib extends React.Component {
  constructor(props) {
    super(props)
    this.handleVideoClick = this.handleVideoClick.bind(this)
  }

  componentWillMount() {
    if (this.props.match.params.libId) {
      this.props.fetchLibById(this.props.match.params.libId)
    }
  }

  // Update Current Video
  handleVideoClick(videoId, youtubeId) {
    history.push(`/playback/${youtubeId}`)
  }

  render() {
    if (!this.props.currentLib) {
      return <div />
    }
    const { videos, allCategories, featuredVideos } = this.props.currentLib
    return (
      <div>
        <Library
          videos={videos}
          categories={allCategories}
          featured={featuredVideos}
          onVideoClick={this.handleVideoClick}
          isPublic
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentLib: state.libraries.currentLib,
  }
}

export default connect(mapStateToProps, actions)(ViewLib)
