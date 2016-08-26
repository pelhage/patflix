import React, { Component, PropTypes } from 'react'

import Hero from './hero'
import VideoRows from './video-rows'

class Library extends Component {
  constructor(props) {
    super(props)
    this.renderHero = this.renderHero.bind(this)
    this.renderVideoRows = this.renderVideoRows.bind(this)
  }

  renderHero() {
    let { videos, featured} = this.props
    if (featured && featured.length) {
      // console.log('Library.renderHero()')
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
    console.log('[Library]-render() invoked this.props', this.props)
    return (
      <div>
        {/* */}<div>{this.renderHero()}</div>
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


/*
https://www.youtube.com/watch?v=bBx2Y5HhplI

render() {
  return (
    <div>
      <div>{this.renderHero()}</div>
      <div>{this.renderVideoRows()}</div>
    </div>
  )
}

*/
