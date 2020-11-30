import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../state/actions'

import Library from './Library'

import rowPreviewImg from '../../images/slide-row.png'
import heroPreviewImg from '../../images/hero.png'

const Preview = (props) => {
  // Update Current Video
  const handleVideoClick = (videoId) => {
    props.replaceCurrentVideo(videoId)
  }

  const {
    libName,
    videos,
    allCategories,
    featuredVideos,
    size,
  } = props.currentLib
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
        onVideoClick={handleVideoClick}
        isPublic={false}
      />
      {rowPlaceholder}
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentLib: state.libraries.currentLib,
})

export default connect(mapStateToProps, actions)(Preview)
