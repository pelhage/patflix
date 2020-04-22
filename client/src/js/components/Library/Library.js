import React from 'react'
import PropTypes from 'prop-types'

import Hero from './Hero'
import VideoRows from './VideoRows'

class Library extends React.Component {
  constructor(props) {
    super(props)
    this.renderHero = this.renderHero.bind(this)
    this.renderVideoRows = this.renderVideoRows.bind(this)
  }

  renderHero() {
    let { videos, featured} = this.props
    if (featured && featured.length) {
      return <div><Hero videos={videos} featured={featured} /></div>
    }
  }

  renderVideoRows() {
    let { videos, categories, onVideoClick, isPublic } = this.props
    if (videos && Object.keys(videos).length) {
      return (
        <VideoRows
          videos={videos}
          categories={categories}
          onVideoClick={onVideoClick}
          isPublic={isPublic}
        />
      )
    }
  }

  render() {
    return (
      <div>
        <div>{this.renderHero()}</div>
        <div>{this.renderVideoRows()}</div>
      </div>
    )
  }
}

Library.propTypes = {
  onVideoClick: PropTypes.func.isRequired,
  videos: PropTypes.object,
  categories: PropTypes.object,
  featured: PropTypes.array,
  isPublic: PropTypes.bool,
}

export default Library
