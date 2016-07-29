import React, { Component } from 'react'

import VideoRow from './video-row.js';

class Library extends Component {

  render() {

    const { videos, categories, onVideoClick } = this.props;
    console.log('videos',videos, 'categories',categories)
    // Go through each category

    var VideoRows = categories.map((category, index) => {
      // Grab videos that contain that category's tag
      let categorizedVideos = categories.reduce((categorizedVideos, currVideo, currVideoIndex) => {
        if (currVideo.categories.indexOf(category) > -1) {
          let categorizedVideo = Object.assign(currVideo, { videoIndex: currVideoIndex })
          categorizedVideos.push(categorizedVideo)
        }
      }, [])

      return (<VideoRow
        videos={categorizedVideos}
        category={category}
        onVideoClick={onVideoClick} />)

    })

    return (
      <div>
        {/* <Hero featured={this.props.featured} /> */}
        {VideoRows}
      </div>
    );
  }
}

export default Library
