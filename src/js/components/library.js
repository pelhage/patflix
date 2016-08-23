import React, { Component } from 'react'

import Hero from './hero'
import VideoRow from './video-row'

class Library extends Component {
  render() {

    const { videos, categories, onVideoClick, featured } = this.props;
    // For each category, create a categorizedVideoRow by
    // checking entire library for the category per video
    // @TODO: clearly need to reduce this sorting method.....
    const VideoRows = []

    // for each category object in categories
    for (var category in categories) {
      if (categories[category].length && videos) {
        let categorizedVideos = categories[category].map((videoId) => {
          return videos[videoId]
        })

        VideoRows.push(<div key={category}><VideoRow
          videos={categorizedVideos}
          category={category}
          onVideoClick={onVideoClick} /></div>)
      }
    }

    return (
      <div>
        <Hero featured={featured} videos={videos} />
        {VideoRows}
      </div>
    );
  }
}

export default Library
