import React, { Component, PropTypes } from 'react'

import Slider from 'react-slick'
import HeroSlides from './HeroSlides'

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  draggable: false,
  slickGoTo: 1,
  slidesToScroll: 1,
  autoplay: false
};


const Hero = (props) => {
  return (
    <div className="hero-wrapper">
      <Slider {...settings}>
        <div>
          <HeroSlides {...props} />
        </div>
      </Slider>
    </div>
  )
}

Hero.propTypes = {
  videos: PropTypes.object.isRequired,
  featured: PropTypes.array.isRequired
}

export default Hero
