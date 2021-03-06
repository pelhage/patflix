import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../state/actions'

import Library from './Library'

import rowPreviewImg from '../../images/slide-row.png'
import heroPreviewImg from '../../images/hero.png'

class Preview extends React.Component {
  constructor(props) {
    super(props)
    this.handleVideoClick = this.handleVideoClick.bind(this)
  }

  // Update Current Video
  handleVideoClick(videoId) {
    this.props.replaceCurrentVideo(videoId)
  }

  render() {
    const {
      libName,
      videos,
      allCategories,
      featuredVideos,
      size,
    } = this.props.currentLib
    // Placeholders for if the library is not complete
    const videoRowImg = <img className="placeholder" src={rowPreviewImg} />
    const videoHeroImg = <img className="placeholder" src={heroPreviewImg} />
    let rowPlaceholder = ''
    let heroPlaceholder = ''
    // Set the placeholders if sections are empty
    if (!size) {
      rowPlaceholder = videoRowImg
      heroPlaceholder = videoHeroImg
    } else if (!Object.keys(featuredVideos).length) {
      heroPlaceholder = videoHeroImg
    }

    return (
      <div>
        <h3>{libName}</h3>
        {heroPlaceholder}
        <Library
          videos={videos}
          categories={allCategories}
          featured={featuredVideos}
          onVideoClick={this.handleVideoClick}
          isPublic={false}
        />
        {rowPlaceholder}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentLib: state.libraries.currentLib,
  }
}

export default connect(mapStateToProps, actions)(Preview)
