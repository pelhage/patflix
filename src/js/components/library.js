import React, { Component } from 'react'

import VideoRow from './video-row.jsx';

class Library extends Component {

  render() {
    console.log('LIBRARY props: ', this.props);
    const { videos, categories } = this.props;
    console.log('LIBRARY CATEGORIES: ', categories);
    // Go through each category
    var VideoRows = categories.map((category, index) => {
      // Grab videos that contain that category's tag
      let categorizedVideos = videos.filter(function(video) {
        return video.categories.split(",").map(item => item.trim()).indexOf(category) > -1;
      });
      console.log('LIBRARY: categorizedVideos', categorizedVideos);
      console.log('LIBRARY category', category);
      return <VideoRow videos={categorizedVideos} category={category} />

    });

    return (
      <div className="contain" >
        {/* <Hero featured={this.props.featured} /> */}
        {VideoRows}
      </div>
    );
  }
}

export default Library
