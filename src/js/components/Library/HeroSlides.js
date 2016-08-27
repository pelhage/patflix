import React, { PropTypes } from 'react'
import Router, { Link } from 'react-router'
import HeroSlide from './HeroSlide'

const HeroSlides = (props) => {
  let { videos, featured } = props
  return (
    <div>
      {featured.map((videoId, index) => {
        let { youtubeId, description } = videos[videoId]
        return (<HeroSlide youtubeId={youtubeId} description={description} />)
      })}
    </div>
  )
}

HeroSlides.propTypes = {
  youtubeId: PropTypes.string,
  description: PropTypes.string
}

export default HeroSlides
