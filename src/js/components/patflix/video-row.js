import React, { Component, PropTypes } from 'react'
import Slider from 'react-slick';
import Video from './video'

class VideoRow extends Component {
  constructor(props) {
    super(props)
    this.renderVideos = this.renderVideos.bind(this)
  }

  onVideoClick(videoId, youtubeId) {
    this.props.onVideoClick(videoId, youtubeId)
  }

  renderVideos() {
    const { videos } = this.props
    // console.log('[VideoRow]-renderVideos() invoked. this.props', this.props)
    console.log('YOU SHOULD SEE length > 0', videos.length)
    return videos.map((video, index) => {
      const { youtubeId, videoId, description } = video
      return (
        <div key={index} onClick={this.onVideoClick.bind(this, videoId, youtubeId)}>
          <Video
            youtubeId={youtubeId}
            description={description}
            />
        </div>
      )
    }, this);
  }

  render() {
    const { settings, videos, category, isPublic } = this.props
    // console.log('[VideoRow]-render() invoked. this.props', this.props)
    return (
      <div className="row">
        <span className="video-category">{category}</span>
          <Slider {...settings}>
            {this.renderVideos()}
          </Slider>
      </div>
    );
  }
}

VideoRow.propTypes = {
  settings: PropTypes.object.isRequired,
  onVideoClick: PropTypes.func.isRequired,
  videos: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  isPublic: PropTypes.bool
}

export default VideoRow
