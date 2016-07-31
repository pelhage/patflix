import React, { Component } from 'react'

import VideoRow from './video-row.js';

class Library extends Component {

  render() {

    const { videos, categories, onVideoClick } = this.props;
    // For each category, create a categorizedVideoRow by
    // checking entire library for the category per video
    // @TODO: clearly need to reduce this sorting method.....
    const VideoRows = categories.map((category, index) => {
      // console.log('Begin iterating through categories.')
      // console.log('Current category: ', category)
      // console.log('Begin iterating through all videos.')
      let categorizedVideos = []
      for (var videoId in videos) {
        // console.log('for ', videoId, ' in ', videos)
        // console.log('Printing current video: ', videos[videoId])
        if (videos[videoId].categories.indexOf(category) > -1) {
          categorizedVideos.push(videos[videoId])
          // console.log('found ', category, ' in ', videos[videoId])
        }
      }

      return (<div><VideoRow
        videos={categorizedVideos}
        category={category}
        onVideoClick={onVideoClick} /></div>)

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
