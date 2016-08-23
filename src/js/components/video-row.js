import React, { Component } from 'react'
import Slider from 'react-slick';

// import Thumbnail from './upload/Thumbnail';



class VideoRow extends Component {

  callVideoClickFunction(videoId, youtubeId) {
    this.props.onVideoClick(videoId, youtubeId)
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
    const { videos, category, isPublic } = this.props
    if (isPublic) {
      settings.infinite = true
    }
    if (videos) {
      var list = videos.map(function(video, index) {
        return (<div key={index} onClick={this.callVideoClickFunction.bind(this, video.videoId, video.youtubeId)}>
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
    } else {
      var list = '<div>Hello</div>'
    }

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
