import React, { PropTypes } from 'react'
import Router, { Link } from 'react-router'




const HeroSlide = (props) => {
  let { description, youtubeId } = props;
  let imageStyle = {
    'backgroundImage': 'url(https://img.youtube.com/vi/'+ youtubeId +'/0.jpg)',
    'backgroundSize': 'cover'
  };

  return (
    <div>
      <div className="hero-row">
        <div className="hero">
          <div className="hero-image" style={imageStyle}></div>
          <div className="vignette"></div>
          <div className="hero-info">
            <div className="hero-details">
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

HeroSlide.propTypes = {
  description: PropTypes.string,
  youtubeId: PropTypes.string
}

export default HeroSlide
