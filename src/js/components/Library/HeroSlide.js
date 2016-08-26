import React, { Component, PropTypes } from 'react'
import Router, { Link } from 'react-router'
import Slider from 'react-slick'


class HeroSlide extends Component {

  render() {
    // console.log('[HeroSlide]- render() invoked. this.props', this.props)
    const { description, youtubeId } = this.props
    // console.log('Trying to ')
    const imageStyle = {
      'backgroundImage': 'url(https://img.youtube.com/vi/'+ youtubeId +'/0.jpg)',
      'backgroundSize': 'cover',
    };

    return (
      <div>
        <div className="hero-row">
          <div className="hero">
            <div className="hero-image" style={imageStyle}></div>
            <div className="vignette"></div>
            <div className="hero-info">
              <div className="hero-details">
                {/*<h1 className="hero-details__title">{videos[videoId].title}</h1> */}
                <p className="hero-details__description">{description}</p>
                <div>
                  <Link className="btn btn-primary"
                     to={"/playback/"+ youtubeId}>
                     &#x25b6;&#xFE0E; Play
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

HeroSlide.propTypes = {
  description: PropTypes.string,
  youtubeId: PropTypes.string
}

export default HeroSlide
