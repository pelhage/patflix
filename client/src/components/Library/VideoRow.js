import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import Video from './Video'

const VideoRow = (props) => {
  const onVideoClick = (videoId, youtubeId) => {
    props.onVideoClick(videoId, youtubeId)
  }

  const renderVideos = () => {
    const { videos } = props
    return videos.map((video, index) => {
      const { youtubeId, videoId, description } = video
      return (
        <div key={index} onClick={onVideoClick.bind(this, videoId, youtubeId)}>
          <Video youtubeId={youtubeId} description={description} />
        </div>
      )
    }, this)
  }

  const { settings, videos, category, isPublic } = props
  return (
    <div className="row">
      <span className="video-category">{category}</span>
      <Slider {...settings}>{renderVideos()}</Slider>
    </div>
  )
}

VideoRow.propTypes = {
  settings: PropTypes.object.isRequired,
  onVideoClick: PropTypes.func.isRequired,
  videos: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  isPublic: PropTypes.bool,
}

export default VideoRow
