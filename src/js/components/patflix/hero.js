import React, { Component, PropTypes } from 'react'
import Router, { Link } from 'react-router'
import Slider from 'react-slick'
import HeroSlide from './hero-slide'

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

class Hero extends Component {
  constructor(props) {
    super(props)
    this.renderHeroSlides = this.renderHeroSlides.bind(this)
  }

  renderHeroSlides() {
    // console.log('[Hero]-renderHeroSlides() invoked ')
    const { videos, featured } = this.props
    return featured.map((videoId, index) => {
      let { youtubeId, description } = videos[videoId]
      // console.log('Hero Slid with: [youtubeId]: ', youtubeId, ' [description]: ', description, ' [videoId]: ', videoId)
      return <div><HeroSlide youtubeId={youtubeId} description={description} /></div>
    })
  }

  render() {
    // console.log('[Hero]-render() invoked')
    return (
      <div className="hero-wrapper">
        <Slider {...settings}>
          {this.renderHeroSlides()}
        </Slider>
      </div>
    )
  }
}

Hero.propTypes = {
  videos: PropTypes.object.isRequired,
  featured: PropTypes.array.isRequired
}

export default Hero
/*
https://www.youtube.com/watch?v=bBx2Y5HhplI */
