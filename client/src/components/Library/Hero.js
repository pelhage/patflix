import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import HeroSlide from './HeroSlide'

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  draggable: false,
  slickGoTo: 1,
  slidesToScroll: 1,
  autoplay: false,
}

const Hero = ({ videos, featured }) => (
  <div className="hero-wrapper">
    <Slider {...settings}>
      {featured.map((videoId, index) => {
        const { youtubeId, description } = videos[videoId]
        return (
          <div key={index + videoId}>
            <HeroSlide
              key={index + videoId}
              youtubeId={youtubeId}
              description={description}
            />
          </div>
        )
      })}
    </Slider>
  </div>
)

Hero.propTypes = {
  videos: PropTypes.object.isRequired,
  featured: PropTypes.array.isRequired,
}

export default Hero
