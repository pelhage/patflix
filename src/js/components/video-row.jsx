import React, { Component } from 'react'
import Slider from 'react-slick';

import Thumbnail from './upload/Thumbnail';

class VideoRow extends Component {

  render() {
    var settings = {
      arrows: true,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      responsive: [
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4
        }
      }]
    }

    const {videos, category } = this.props

    let list = videos.map(function(video, index) {
      return (<div key={index}>
        <div className="tile">
          <div className="tile__media">
            <div>
              <Thumbnail className="tile__img" url={video.url} />
            </div>
          </div>
          <div className="tile__details">
            <div className="tile__title">
              {video.description}
            </div>
          </div>
        </div>
      </div>)
    });

    return (
      <div className="row">
        <span className="video-category">{category}</span>
          <Slider {...settings}>
            {list}
          </Slider>
      </div>
    );
  }
}

export default VideoRow
