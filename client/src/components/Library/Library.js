import React from 'react'
import PropTypes from 'prop-types'

import Hero from './Hero'
import VideoRows from './VideoRows'

const Library = ({ videos, featured, categories, onVideoClick, isPublic }) => {
  const shouldShowHero = featured && featured.length
  const shouldShowVideoRows = videos && Object.keys(videos).length

  return (
    <div>
      <div>
        {shouldShowHero && (
          <div>
            <Hero videos={videos} featured={featured} />
          </div>
        )}
      </div>
      <div>
        {shouldShowVideoRows && (
          <VideoRows
            videos={videos}
            categories={categories}
            onVideoClick={onVideoClick}
            isPublic={isPublic}
          />
        )}
      </div>
    </div>
  )
}

Library.propTypes = {
  onVideoClick: PropTypes.func.isRequired,
  videos: PropTypes.object,
  categories: PropTypes.object,
  featured: PropTypes.array,
  isPublic: PropTypes.bool,
}

export default Library
