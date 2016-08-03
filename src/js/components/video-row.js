import React, { Component } from 'react'
import Slider from 'react-slick';

// import Thumbnail from './upload/Thumbnail';

class VideoRow extends Component {
  constructor(props) {
    super(props)
  }

  callVideoClickFunction(val) {
    this.props.onVideoClick(val)
  }

  render() {
    var settings = {
      arrows: true,
      dots: false,
      infinite: false,
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

    const { videos, category } = this.props
    //, onVideoClick

    let list = videos.map(function(video, index) {
      return (<div key={video.videoId} onClick={this.callVideoClickFunction.bind(this, video.videoId)}>
        <div className="tile">
          <div className="tile__media">
            <div>
              <img className="tile__img" src={"http://img.youtube.com/vi/"+video.youtubeId+"/0.jpg"} />
            </div>
          </div>
          <div className="tile__details">
            <div className="tile__title">
              {video.description}
            </div>
          </div>
        </div>
      </div>)
    }, this);

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
