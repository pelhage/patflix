import React from 'react'
import PropTypes from 'prop-types'
import VideoRow from './VideoRow'

class VideoRows extends React.Component {
  constructor(props) {
    super(props)
    this.renderVideoRows = this.renderVideoRows.bind(this)
  }

  // @TODO: clearly need to simplify this sorting method.....
  // For each category, create a categorizedVideoRow by
  // checking entire library for the category per video
  renderVideoRows() {
    const { videos, categories, onVideoClick, isPublic } = this.props
    const VideoRowsArr = []

    const settings = {
      arrows: true,
      dots: false,
      infinite: isPublic,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      responsive: [
        {
          breakpoint: 320,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 4,
          },
        },
      ],
    }

    // for each category object in categories
    for (const category in categories) {
      // If the category has videos in it
      if (categories[category].length && videos) {
        const categorizedVideos = categories[category].map((videoId) => {
          return videos[videoId]
        })

        VideoRowsArr.push(
          <div key={category}>
            <VideoRow
              videos={categorizedVideos}
              category={category}
              onVideoClick={onVideoClick}
              isPublic={isPublic}
              settings={settings}
            />
          </div>
        )
      }
    }

    return VideoRowsArr
  }

  render() {
    return <div>{this.renderVideoRows()}</div>
  }
}

VideoRows.propTypes = {
  videos: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  onVideoClick: PropTypes.func.isRequired,
  isPublic: PropTypes.bool.isRequired,
}

export default VideoRows
