import React, { Component } from 'react'

import VideoRow from './video-row.jsx';

class Library extends Component {

  render() {

    const { videos, categories } = this.props;
    console.log('videos',videos, 'categories',categories)
    // Go through each category
    var VideoRows = categories.map((category, index) => {
      // Grab videos that contain that category's tag
      let categorizedVideos = videos.filter(function(video) {
        if (video.categories) {
          return video.categories.split(",").map(item => item.trim()).indexOf(category) > -1;
        }
        return false;
      });

      return <VideoRow videos={categorizedVideos} category={category} />

    });

    return (
      <div>
        {/* <Hero featured={this.props.featured} /> */}
        {VideoRows}
      </div>
    );
  }
}

export default Library
